<script lang="tsx">
import { defineComponent, nextTick, onMounted, onUnmounted, PropType, ref, VNode, watch } from 'vue';
import Logo from '@/assets/logo.png';
import SvgIconCross from './svg/SvgIconCross.vue';
import SvgIconChevronDown from './svg/SvgIconChevronDown.vue';
import ContentNavBlock from './ContentNavBlock.vue';
import HistoryData from '@/data/history';

export default defineComponent({
	name: 'ContentBlock',
	props: {
		isShown: { type: Boolean as PropType<boolean>, required: true }
	},
	emits: {
		close: null
	},
	setup(props, ctx) {
		const isHistoryOpen = ref(false);
		const navBlock = ref<HTMLDivElement>();
		const navBlockHeight = ref('0px');
		const currentSection = ref<keyof typeof HistoryData | null>(null);
		const navigation = {
			pavel: 'Кот Павел',
			vyp: 'Большая Выпь',
			li: 'Доктор Ли',
			irukka: 'Ирюкка'
		};

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

		const onHistoryItemClick = (name: keyof typeof navigation) => {
			currentSection.value = name;
		};

		return (): VNode => (
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
							<ContentNavBlock title="Истории" navigation={navigation} onNavItemClick={() => console.log('Hi')} />
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

					<section class="content-block__content">
						{currentSection.value === null && <span>Выбери себе</span>}
						{currentSection.value !== null && (
							<>
								<h2>{HistoryData[currentSection.value].header}</h2>
								{HistoryData[currentSection.value].content.map(({ header, text }) => {
									return (
										<>
											<h3>{header}</h3>
											<p>{text}</p>
										</>
									);
								})}
							</>
						)}
					</section>
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
</style>
