#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, token, Address, Env, String, Vec,
};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Campaign {
    pub id: u32,
    pub creator: Address,
    pub title: String,
    pub description: String,
    pub funding_goal: i128,
    pub current_amount: i128,
    pub deadline: u64,
    pub closed: bool,
    pub withdrawn: bool,
}

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Campaign(u32),
    CampaignCount,
    NativeToken,
}

#[contract]
pub struct FundFlowContract;

#[contractimpl]
impl FundFlowContract {
    pub fn initialize(env: Env, native_token: Address) {
        if env.storage().instance().has(&DataKey::NativeToken) {
            panic!("already initialized");
        }
        env.storage()
            .instance()
            .set(&DataKey::NativeToken, &native_token);
        env.storage().instance().set(&DataKey::CampaignCount, &0u32);
    }

    pub fn create_campaign(
        env: Env,
        creator: Address,
        title: String,
        description: String,
        funding_goal: i128,
        deadline: u64,
    ) -> u32 {
        creator.require_auth();
        if funding_goal <= 0 {
            panic!("funding goal must be positive");
        }
        if deadline <= env.ledger().timestamp() {
            panic!("deadline must be in the future");
        }

        let id = Self::get_campaign_count(env.clone()) + 1;
        let campaign = Campaign {
            id,
            creator: creator.clone(),
            title,
            description,
            funding_goal,
            current_amount: 0,
            deadline,
            closed: false,
            withdrawn: false,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Campaign(id), &campaign);
        env.storage().instance().set(&DataKey::CampaignCount, &id);
        env.events().publish((symbol_short!(created), creator), id);
        id
    }

    pub fn donate(env: Env, donor: Address, campaign_id: u32, amount: i128) {
        donor.require_auth();
        if amount <= 0 {
            panic!("donation must be positive");
        }

        let mut campaign = Self::get_campaign(env.clone(), campaign_id);
        if campaign.closed || campaign.withdrawn {
            panic!("campaign is closed");
        }
        if env.ledger().timestamp() > campaign.deadline {
            campaign.closed = true;
            env.storage()
                .persistent()
                .set(&DataKey::Campaign(campaign_id), &campaign);
            panic!("campaign deadline passed");
        }

        let token_client = token::Client::new(&env, &Self::native_token(env.clone()));
        token_client.transfer(&donor, &env.current_contract_address(), &amount);

        campaign.current_amount += amount;
        if campaign.current_amount >= campaign.funding_goal {
            campaign.closed = true;
        }
        env.storage()
            .persistent()
            .set(&DataKey::Campaign(campaign_id), &campaign);
        env.events()
            .publish((symbol_short!(donated), donor), (campaign_id, amount));
    }

    pub fn withdraw(env: Env, creator: Address, campaign_id: u32) {
        creator.require_auth();
        let mut campaign = Self::get_campaign(env.clone(), campaign_id);
        if campaign.creator != creator {
            panic!("only creator may withdraw");
        }
        if campaign.withdrawn {
            panic!("funds already withdrawn");
        }
        if campaign.current_amount <= 0 {
            panic!("no funds available");
        }
        if campaign.current_amount < campaign.funding_goal
            && env.ledger().timestamp() <= campaign.deadline
        {
            panic!("withdrawal conditions not met");
        }

        campaign.closed = true;
        campaign.withdrawn = true;
        env.storage()
            .persistent()
            .set(&DataKey::Campaign(campaign_id), &campaign);

        let token_client = token::Client::new(&env, &Self::native_token(env.clone()));
        token_client.transfer(
            &env.current_contract_address(),
            &creator,
            &campaign.current_amount,
        );
        env.events().publish(
            (symbol_short!(withdrawn), creator),
            (campaign_id, campaign.current_amount),
        );
    }

    pub fn get_campaign(env: Env, campaign_id: u32) -> Campaign {
        env.storage()
            .persistent()
            .get(&DataKey::Campaign(campaign_id))
            .unwrap_or_else(|| panic!("campaign not found"))
    }

    pub fn get_campaign_count(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::CampaignCount)
            .unwrap_or(0)
    }

    pub fn get_all_campaigns(env: Env) -> Vec<Campaign> {
        let count = Self::get_campaign_count(env.clone());
        let mut campaigns = Vec::new(&env);
        let mut id = 1u32;
        while id <= count {
            if let Some(campaign) = env.storage().persistent().get(&DataKey::Campaign(id)) {
                campaigns.push_back(campaign);
            }
            id += 1;
        }
        campaigns
    }

    fn native_token(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&DataKey::NativeToken)
            .unwrap_or_else(|| panic!("contract not initialized"))
    }
}
