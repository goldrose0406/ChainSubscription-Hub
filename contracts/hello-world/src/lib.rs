#![no_std]

use soroban_sdk::{contractimpl, symbol_short, Env, Address};

pub struct CounterOwner;

#[contractimpl]
impl CounterOwner {
    // Initialize counter + owner
    pub fn init(env: Env, owner: Address, start: i128) {
        env.storage().set(&symbol_short!("owner"), &owner);
        env.storage().set(&symbol_short!("count"), &start);
    }

    // Only owner can set the counter
    pub fn set(env: Env, v: i128) {
        let caller: Address = env.invoker();
        let owner: Address = env.storage().get(&symbol_short!("owner")).unwrap();
        if caller != owner {
            panic!("only owner");
        }
        env.storage().set(&symbol_short!("count"), &v);
    }

    // Increment by 1 (anyone)
    pub fn inc(env: Env) {
        let key = symbol_short!("count");
        let cur: i128 = env.storage().get(&key).unwrap_or(0);
        env.storage().set(&key, &(cur + 1));
    }

    // Read the counter
    pub fn get(env: Env) -> i128 {
        env.storage().get(&symbol_short!("count")).unwrap_or(0)
    }
}
