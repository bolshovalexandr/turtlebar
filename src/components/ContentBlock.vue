<script lang="tsx">
import { defineComponent, nextTick, onMounted, onUnmounted, PropType, ref, watch } from 'vue';
import SvgIconCross from './svg/SvgIconCross.vue';
import SvgIconChevronDown from './svg/SvgIconChevronDown.vue';
import Logo from '@/assets/logo.png';

import HistoryData from '@/data/history';

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
		let isHistoryOpen = ref(false);
		let navBlock = ref<HTMLDivElement>();
		let navBlockHeight = ref('0px');
		let currentSection = ref<keyof typeof HistoryData>('li');

		const contentBlockCloseHandler = () => {
			ctx.emit('close', null);
		};

		const onDocumentKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				contentBlockCloseHandler();
			}
		};

		const getNavBlockHeight = () => {
			if (!navBlock.value?.children) {
				return '0px';
			}
			return [...navBlock.value?.children].reduce((acc, el) => acc + el.getBoundingClientRect().height, 0) + 'px';
		};

		onMounted(() => {
			document.addEventListener('keydown', onDocumentKeydown);
			document.addEventListener('resize', () => {
				navBlockHeight.value = getNavBlockHeight();
			});
		});

		onUnmounted(() => {
			document.removeEventListener('keydown', onDocumentKeydown);
		});

		watch(
			() => props.isShown,
			(next) => {
				if (next) {
					nextTick(() => {
						navBlockHeight.value = getNavBlockHeight();
					});
				}
			}
		);

		const onChevronClick = () => (isHistoryOpen.value = !isHistoryOpen.value);

		return () => (
			<article class="content-block" v-show={props.isShown}>
				<header class="content-block__header">
					<a href="#" class="">
						<img src={Logo} alt="" />
					</a>
					<SvgIconCross class="content-block__close" onClick={contentBlockCloseHandler} />
				</header>

				<div class="content-block__main">
					<nav class="content-block__nav">
						<div class="nav">
							<div
								class={{
									nav__header: true,
									'nav__header--active': isHistoryOpen.value
								}}
								onClick={onChevronClick}
							>
								<h3>Истории</h3>
								<SvgIconChevronDown />
							</div>
							<ul
								ref={navBlock}
								style={{ maxHeight: navBlockHeight.value }}
								class={{
									nav__block: true,
									'nav__block--hidden': !isHistoryOpen.value
								}}
							>
								<li class="nav__item">Кот Павел</li>
								<li class="nav__item">Большая Выпь</li>
								<li class="nav__item">Доктор Ли</li>
								<li class="nav__item">Ирюкка</li>
							</ul>
						</div>
						<h3 class="nav__header">Персонажи</h3>
						<ul class="nav__block">
							<li>Кот Павел</li>
							<li>Большая Выпь</li>
							<li>Доктор Ли</li>
							<li>Ирюкка</li>
						</ul>
						<h3 class="nav__header">Город</h3>
						<ul class="nav__block">
							<li>Остров</li>
							<li>Платформа</li>
							<li>Мост</li>
						</ul>
					</nav>

					<section class="content-block__content">{HistoryData[currentSection.value]}</section>
				</div>
			</article>
		);
	}
});
</script>

<style lang="scss" scoped>
.content-block {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	padding: 0 36px;
	background-color: $White;
	&__header {
		display: flex;
		align-items: center;
		height: 80px;
		margin-bottom: 36px;
		border: 1px solid $LightGray;
	}
	&__main {
		display: flex;
		border: 1px solid $LightGray;
	}
	&__nav {
		margin-right: 60px;
		border: 1px solid $LightGray;
	}
	&__content {
		width: 760px;
		border: 1px solid $LightGray;
	}
	&__close {
		margin-left: auto;
		cursor: pointer;
	}
}

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
		margin-bottom: 12px;
		color: $Black;
		transition: color 0.3s;
		cursor: pointer;
		&:hover {
			color: $TurtleOrange;
		}
	}
}
</style>
