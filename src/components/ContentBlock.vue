<script lang="tsx">
import { defineComponent, onMounted, onUnmounted, PropType } from 'vue';
import SvgIconCross from './svg/SvgIconCross.vue';
import Logo from '@/assets/logo.png';

const IconCross: any = SvgIconCross;

export default defineComponent({
	name: 'ContentBlock',
	components: {
		SvgIconCross
	},
	props: {
		isShown: { type: Boolean as PropType<boolean>, required: true }
	},
	emits: {
		close: null
	},
	setup(props, ctx) {
		function contentBlockCloseHandler() {
			ctx.emit('close', null);
		}

		function onDocumentKeydown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				contentBlockCloseHandler;
			}
		}

		onMounted(() => {
			document.addEventListener('keydown', onDocumentKeydown);
		});

		onUnmounted(() => {
			document.removeEventListener('keydown', onDocumentKeydown);
		});

		return () => (
			<article class="wrapper" v-show={props.isShown}>
				<nav class="wrapper__nav">
					<a href="#">
						<img src={Logo} alt="" />
					</a>
				</nav>
				<section class="wrapper__content"></section>
				<IconCross class="wrapper__close" onClick={contentBlockCloseHandler} />
			</article>
		);
	}
});
</script>

<style lang="scss" scoped>
.wrapper {
	display: flex;
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	padding: 8px 16px;
	background-color: #fff;
}
.close {
	position: absolute;
	top: 36px;
	right: 36px;
	cursor: pointer;
}
</style>
