<!-- cli.vue -->

<template>
	<div class="wrapper">
		<div id="output-box"
			class="cli-text"
			style="white-space: pre"
			v-text="outputText">
		</div>
		<input id="input-line"
			class="cli-text"
			type="text"
			maxlength="56"
			autofocus
			@keydown.enter="submitInput"
			@keydown.up.prevent="getPreviousInput"
			@keydown.down.prevent="getNextInput"
		/>
	</div>
</template>

<script>

	export default {
		name: 'cli',
		data () {
			return {
				outputText: `> Welcome.\n`,
				inputLock: false,
				history: [],
				historyIndex: null,
				MAX_HISTORY: 100,
				lockTime: null,
				MAX_LOCK_TIME: 2000
			};
		},
		methods: {
			submitInput () {
				const cli = document.getElementById('input-line');
				const inputText = cli.value.trim();

				if (this.inputLock) {
					console.log(this.lockTimeExceeded());
					if (this.lockTimeExceeded())	{
						this.unlockInput();
					} else {
						return;
					}
				}

				if(!inputText) {
					return;
				}
				else {
					this.lockInput();
				}
				this.historyIndex = null;
				this.addToHistory(inputText);

				if (inputText[0] === '/') {
					this.parseCommand(inputText);
				}
				else {
					this.getOutput(inputText);
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
			},
			getOutput(input) {
				this.addToOutputBox(input);
				this.lockInput();
				this.$http.get(`/api/parseInput/${input}`).then((res) => {
					console.log(res);
					this.addToOutputBox(res.body);
					// this.setScrollToBottom('output-box');
					this.unlockInput();
				}, (err) => {
					this.addToOutputBox('Error with input.');
					// this.setScrollToBottom('output-box');
					this.unlockInput();
					console.log(err);
				});
			},
			addToOutputBox(text) {
				const line = `> ${text}\n`;
				const scrollToBottom = this.setScrollToBottom;
				this.outputText += line;

				// Might be a better way to do this
				setTimeout(function () {
					scrollToBottom('output-box');
				}, 100);
			},
			unlockInput() {
				this.inputLock = false
			},
			lockInput() {
				this.lockTime = Date.now();
				this.inputLock = true
			},
			addToHistory(input) {
				while (this.history.length >= this.MAX_HISTORY) {
					this.history.shift();
				}
				this.history.push(input);
			},
			getPreviousInput() {
				const historyLength = this.history.length;

				if (historyLength === 0) {
					return;
				}

				if (this.historyIndex === null || this.historyIndex - 1 < 0) {
					this.historyIndex = historyLength - 1;
				}
				else if (this.historyIndex - 1 <= historyLength) {
					this.historyIndex--;
				}

				const cli = document.getElementById('input-line');
				cli.value = this.history[this.historyIndex];
			},
			getNextInput() {
				const historyLength = this.history.length;

				if (historyLength === 0) {
					return;
				}

				if (this.historyIndex === null) {
					this.historyIndex = 0;
				}
				else if (this.historyIndex + 1 <= historyLength - 1 ) {
					this.historyIndex++;
				}
				else if (this.historyIndex + 1 > historyLength - 1) {
					this.historyIndex = 0;
				}

				const cli = document.getElementById('input-line');
				cli.value = this.history[this.historyIndex];
			},
			parseCommand(cmd) {
				console.log(cmd);
				switch (cmd.toLowerCase()) {
					case '/clear':
						this.clearOutput(); break;
					case '/clearhistory':
						this.history = []; break;
					default:
				}
				this.unlockInput();
			},
			lockTimeExceeded() {
				return Date.now() - this.lockTime > this.MAX_LOCK_TIME;
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
