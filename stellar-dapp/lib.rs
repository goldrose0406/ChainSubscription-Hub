#![no_std]

use soroban_sdk::{contractimpl, Env};

pub struct Math;

#[contractimpl]
impl Math {
    // Simple add function (no storage) — safe to compile in Studio
    pub fn add(_env: Env, a: i128, b: i128) -> i128 {
        a + b
    }

    // Simple multiply function
    pub fn mul(_env: Env, a: i128, b: i128) -> i128 {
        a * b
    }
}
