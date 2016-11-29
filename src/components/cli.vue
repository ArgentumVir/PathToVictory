<!-- cli.vue -->

<template>
	<div class="wrapper">
		<div class="cli-text" id="output-box" @click="test2">test<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>test</div>
		<input class="cli-text" id="input-line" type="text" maxlength="56" autofocus @keyup.enter="test"/>
	</div>
</template>

<script>
	export default {
		name: 'cli',
		data () {
			return {};
		},
		methods: {
			test () {
				console.log('YOLO');
			},
			test2 () {
				console.log('dasdasdad');
			}
		},
		mounted () {
			this.test();
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
		text-indent: 4px;
		font-size: 16px;
		min-width: 520px;
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

		width: 40%;
		display: block;
		text-align: left;
		overflow: hidden;
	}
</style>
