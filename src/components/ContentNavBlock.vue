<script lang="tsx">
import { defineComponent, onMounted, onUnmounted, PropType, ref, VNode } from 'vue';
import SvgIconChevronDown from './svg/SvgIconChevronDown.vue';

export default defineComponent({
	props: {
		title: { type: String as PropType<string>, required: true },
		navigation: { type: Object as PropType<{ [K: string]: string }>, required: true },
		onNavItemClick: Function as PropType<(name: string) => void>
	},
	emits: {
		navItemClick(payload: string) {
			return Boolean(payload);
		}
	},
	setup(props, ctx) {
		const isBlockOpen = ref(false);
		const navBlock = ref<HTMLElement | null>(null);
		const navBlockHeight = ref('0px');
		const onChevronClick = () => (isBlockOpen.value = !isBlockOpen.value);
		const getNavBlockHeight = () => {
			if (!navBlock.value?.children) {
				return '0px';
			}
			navBlockHeight.value =
				[...navBlock.value?.children].reduce((acc, el) => acc + el.getBoundingClientRect().height, 0) + 'px';
		};
		onMounted(() => {
			getNavBlockHeight();
			window.addEventListener('resize', getNavBlockHeight);
		});
		onUnmounted(() => {
			window.removeEventListener('resize', getNavBlockHeight);
		});

		return (): VNode => (
			<div class="nav">
				<div
					class={{
						nav__header: true,
						'nav__header--active': isBlockOpen.value
					}}
					onClick={onChevronClick}
				>
					<h3>{props.title}</h3>
					<SvgIconChevronDown />
				</div>
				<ul
					ref={navBlock}
					style={{ maxHeight: navBlockHeight.value }}
					class={{
						nav__block: true,
						'nav__block--hidden': !isBlockOpen.value
					}}
				>
					{Object.keys(props.navigation).map((key) => {
						return (
							<li class="nav__item" onClick={() => ctx.emit('navItemClick', key)}>
								{props.navigation[key]}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
});
</script>

<style lang="scss" scoped>
.nav {
	width: 200px;
	margin-bottom: 16px;
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
		font-size: 24px;
		cursor: pointer;
		h3 {
			color: $DarkGray;
			transition: color 0.35s;
		}
		svg {
			transition: transform 0.35s;
		}

		&--active {
			h3 {
				color: $TurtleGreen;
			}
			svg {
				transform: rotate(180deg);
			}
		}
	}
	&__block {
		margin-left: 36px;
		font-size: 18px;
		list-style: none;
		overflow: hidden;
		transition: max-height 0.35s;
		&--hidden {
			max-height: 0 !important;
		}
	}
	&__item {
		padding-bottom: 12px;
		color: $Black;
		transition: color 0.3s;
		cursor: pointer;
		&:hover {
			color: $TurtleOrange;
		}
	}
}
</style>
