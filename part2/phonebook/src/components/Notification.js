import "./notification.css";
import React from 'react';

const Notification = ({ message, type }) => {
	if (!message || !type) {
		return <></>;
	}

	function classNames() {
		switch (type) {
			case 'success':
				return 'notification success';
			
			case 'info':
				return 'notification info';

			case 'warning':
				return 'notification warning';

			case 'error':
				return 'notification error';

			default:
				return 'notification info';
		}
	}

	return (
		<div className={classNames()}>
			{message}
		</div>
	)
}

export default Notification;