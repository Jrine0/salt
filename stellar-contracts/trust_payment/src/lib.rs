#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};

#[derive(Clone)]
#[contracttype]
pub struct UserTrust {
    pub trust_score: u32,
    pub level: u32,
    pub credit_line: i128,
    pub interest_rate: u32,
    pub outstanding_balance: i128,
    pub warnings_count: u32,
    pub reward_points: u32,
    pub is_active: bool,
    pub wallet_address: Address,
}

#[derive(Clone)]
#[contracttype]
enum DataKey {
    User(Address),
}

#[contract]
pub struct TrustPaymentContract;

#[contractimpl]
impl TrustPaymentContract {
    pub fn register_user(env: Env, user: Address) {
        user.require_auth();

        let profile = UserTrust {
            trust_score: 1000,
            level: 1,
            credit_line: 10_000,
            interest_rate: 4,
            outstanding_balance: 0,
            warnings_count: 0,
            reward_points: 0,
            is_active: true,
            wallet_address: user.clone(),
        };

        env.storage()
            .persistent()
            .set(&DataKey::User(user), &profile);
    }

    pub fn make_payment(env: Env, user: Address, amount: i128, payment_type: Symbol) {
        user.require_auth();

        let mut profile = Self::get_user(env.clone(), user.clone());
        let earned = Self::calculate_points_earned(amount, payment_type);

        profile.reward_points = profile.reward_points.saturating_add(earned);
        profile.trust_score = profile.trust_score.saturating_add(earned);
        profile.outstanding_balance = profile.outstanding_balance.saturating_sub(amount);
        profile.level = Self::calculate_level(profile.trust_score);

        env.storage()
            .persistent()
            .set(&DataKey::User(user), &profile);
    }

    pub fn redeem_reward_points(env: Env, user: Address, points: u32) {
        user.require_auth();

        let mut profile = Self::get_user(env.clone(), user.clone());
        if profile.reward_points < points {
            panic!("insufficient points")
        }

        profile.reward_points -= points;
        env.storage()
            .persistent()
            .set(&DataKey::User(user), &profile);
    }

    pub fn get_user(env: Env, user: Address) -> UserTrust {
        env.storage()
            .persistent()
            .get(&DataKey::User(user.clone()))
            .unwrap_or(UserTrust {
                trust_score: 0,
                level: 1,
                credit_line: 10_000,
                interest_rate: 4,
                outstanding_balance: 0,
                warnings_count: 0,
                reward_points: 0,
                is_active: false,
                wallet_address: user,
            })
    }

    fn calculate_points_earned(amount: i128, payment_type: Symbol) -> u32 {
        let base = if amount <= 0 { 0 } else { (amount / 10) as u32 };
        if payment_type == symbol_short!("early") {
            base.saturating_mul(2)
        } else if payment_type == symbol_short!("ontime") {
            base
        } else {
            base / 2
        }
    }

    fn calculate_level(score: u32) -> u32 {
        if score < 2500 {
            1
        } else if score < 5000 {
            2
        } else if score < 7500 {
            3
        } else if score < 10000 {
            4
        } else {
            5
        }
    }
}
