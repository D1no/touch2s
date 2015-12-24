import { Component } from 'react';

export default class TestComponent extends Component {
	render() {
		const {content} = this.props;
		return (
			<div className="TestComponent">
				{content}
			</div>
		);
	}
}

