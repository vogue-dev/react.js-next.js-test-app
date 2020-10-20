import React from 'react';

export default function Loader() {
	return (
		<div className="loader-wrapper">
			<div className="loader" />
			<style jsx>{`
				.loader-wrapper {
					position: absolute;
					height: 100%;
					width: 100%;
					top: 0;
					left: 0;
					background-color: lightgray;
				}

				.loader {
					z-index: 1020 !important;
					width: 75px;
					height: 75px;
					position: absolute;
					top: 50%;
					left: 50%;
					border: 10px solid #f3f3f3;
					border-left-color: #000000;
					border-radius: 50%;
					animation: spin 1.1s infinite linear;
				}

				@keyframes spin {
					0% {
						transform: translate(-50%, -50%) rotate(0deg);
					}
					100% {
						transform: translate(-50%, -50%) rotate(360deg);
					}
				}
			`}</style>
		</div>
	);
}
