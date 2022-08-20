<template>
	<div class="darklayer" v-if="isOpen" @click="onPopupClose">
		<div class="popup" @click.stop>
			<div class="popup__content"><slot name="content">Story is under construction </slot></div>
			<div class="popup__buttons">
				<slot name="buttons" :popupCloseHandler="onPopupClose"><button @click="onPopupClose">Закрыть</button></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, PropType } from 'vue';

export default defineComponent({
	name: 'PopupComponent',
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
.darklayer {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background-color: rgba(65, 60, 75, 0.7);
}

.popup {
	max-width: 720px;
	min-width: 320px;
	min-height: 240px;
	padding: 8px 16px;
	border: 1px solid grey;
	border-radius: 4px;
	background-color: #fff;
}
</style>
