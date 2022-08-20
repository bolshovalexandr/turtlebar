<template>
	<article class="popup" @click.stop v-if="isOpen">
		<header>
			<a href="#"><img class="header__logo" src="@/assets/logo.png" alt="" /></a>
		</header>
		<div class="popup__content"><slot name="content">Story is under construction </slot></div>
		<div class="popup__buttons">
			<slot name="buttons" :popupCloseHandler="onPopupClose"><button @click="onPopupClose">Закрыть</button></slot>
		</div>
	</article>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, PropType } from 'vue';

export default defineComponent({
	name: 'ContentBlock',
	props: {
		isOpen: { type: Boolean as PropType<boolean>, required: true }
	},
	emits: {
		'popup-close': null
	},
	setup(_props, ctx) {
		function onPopupClose() {
			ctx.emit('popup-close', null);
		}

		function onDocumentKeydown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				onPopupClose;
			}
		}

		onMounted(() => {
			document.addEventListener('keydown', onDocumentKeydown);
		});

		onUnmounted(() => {
			document.removeEventListener('keydown', onDocumentKeydown);
		});

		return {
			onPopupClose
		};
	}
});
</script>

<style lang="scss" scoped>
.popup {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	padding: 8px 16px;
	background-color: #fff;
}
</style>
