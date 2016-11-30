<!-- cli.vue -->

<template>
	<div class="wrapper">
		<div class="cli-text" id="output-box" style="white-space: pre">{{ outputText }}</div>
		<input class="cli-text" id="input-line" type="text" maxlength="56" autofocus @keyup.enter="submitInput"/>
	</div>
</template>

<script>
	export default {
		name: 'cli',
		data () {
			return {
				outputText: ``
			};
		},
		methods: {
			submitInput () {
				const cli = document.getElementById('input-line');

				if (cli.value.trim() === '/clear') {
					this.clearOutput();
				}
				else {
					const input = ` > ${cli.value}\n`;
					this.outputText += input;
					this.setScrollToBottom('output-box');
				}
				this.clearInput(cli);
			},
			clearOutput() {
				this.outputText = '';
			},
			clearInput(inputElement) {
				inputElement.value = '';
			},
			setScrollToBottom (id) {
				const element = document.getElementById(id);
				element.scrollTop = element.scrollHeight;
			}
		},
		mounted () {
			this.setScrollToBottom('output-box');
		}
	};
</script>

<style>
	.wrapper {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
		text-align: center;
		float: left;
		border: none;
	}
	.cli-text {
		font-size: 16px;
		min-width: 520px;
		background-color: white;
	}
	.cli-text:focus {
		outline: none;
	}
	#output-box {
		border-width: 2px;
		border-style: ridge;
		border-bottom: 0px;
		border-color: lightgray;

		display: block;
		text-align: left;
		width: 40%;
		height: 240px;
		overflow-y: scroll;
	}
	#input-line {
		border-width: 2px;
		border-style: ridge;
		border-color: lightgray;

		text-indent: 4px;

		width: 40%;
		display: block;
		text-align: left;
		overflow: hidden;
	}
</style>
