/**
 * Rewards Component
 *
 * Ghostery Browser Extension
 * https://www.ghostery.com/
 *
 * Copyright 2018 Ghostery, Inc. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */

import React, { Component } from 'react';
import { ToggleSlider, RewardListItem } from './BuildingBlocks';

/**
 * @class The Rewards Panel shows offers generated by Ghostery Rewards.
 * The panel is opened from a button in the Detailed View's footer.
 * See DetailMenu.jsx.
 * @memberof PanelClasses
 */
class Rewards extends React.Component {
	constructor(props) {
		super(props);

		// event bindings
		this.toggleRewards = this.toggleRewards.bind(this);
		this.removeReward = this.removeReward.bind(this);
	}

	/**
	 * Lifecycle event
	 */
	componentDidMount() {
		if (this.props.rewardsActive && !this.props.rewards) {
			this.props.actions.getActiveRewards();
		}
	}

	/**
	 * Handles toggling rewards on/off
	 */
	toggleRewards() {
		const { rewardsActive } = this.props;
		this.props.actions.showNotification({
			text: `Ghostery Rewards is ${rewardsActive ? 'OFF' : 'ON'}`,
			classes: 'purple',
		});
		this.props.actions.toggleRewardsActive();
	}

	/**
	 * Handles removing a reward from the Rewards array
	 * @param  {Int} id the ID of the reward
	 */
	removeReward(id) {
		this.props.actions.removeReward(id);
	}

	/**
	 * Helper render function for the list of Rewards Items
	 * @return {JSX} JSX for the Rewards Items List
	 */
	renderRewardListItems() {
		const { rewards, rewardsActive } = this.props;
		if (!rewardsActive) {
			return <span>Rewards Not Active</span>;
		} else if (!rewards) {
			return <span>Loading Rewards ...</span>;
		} else if (rewards.length === 0) {
			return <span>No Rewards Were Found</span>;
		}

		const rewardsList = rewards.map((reward, index) => (
			<RewardListItem
				index={index}
				id={reward.id}
				key={reward.id}
				unread={reward.unread}
				text={reward.text}
				expires={reward.expires}
				clickCloseButton={this.removeReward}
			/>
		));
		return <div className="scroll-content">{ rewardsList }</div>;
	}

	/**
	 * React's required render function. Returns JSX
	 * @return {JSX} JSX for rendering the Rewards portion of the Detailed View
	 */
	render() {
		const { rewardsActive } = this.props;
		return (
			<div className="RewardsPanel">
				<div className="RewardsPanel__header flex-container align-center-middle">
					<span className="RewardsPanel__title">{ t('panel_detail_rewards_title') }</span>
					<span className="RewardsPanel--send-right flex-container align-middle">
						<span>{rewardsActive ? 'ON ' : 'OFF '}</span>
						<ToggleSlider
							className="RewardsPanel--add-padding RewardsPanel--inline-block"
							isChecked={rewardsActive}
							onChange={this.toggleRewards}
						/>
					</span>
				</div>
				{ this.renderRewardListItems() }
			</div>
		);
	}
}

export default Rewards;
