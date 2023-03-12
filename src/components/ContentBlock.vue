<script lang="tsx">
import { defineComponent, onMounted, onUnmounted, ref, VNode } from 'vue';
import Logo from '@/assets/logo.png';
import SvgIconCross from './svg/SvgIconCross.vue';
import ContentNavBlock from './ContentNavBlock.vue';
import HistoryData from '@/data/history';

export default defineComponent({
	name: 'ContentBlock',
	emits: {
		close: null
	},
	setup(props, ctx) {
		type IHistoryDataKeys = keyof typeof HistoryData;

		const currentSection = ref<IHistoryDataKeys | null>(null);
		const navigationHistory: { [k in IHistoryDataKeys]: string } = {
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

		onMounted(() => {
			document.addEventListener('keydown', onDocumentKeydown);
		});

		onUnmounted(() => {
			document.removeEventListener('keydown', onDocumentKeydown);
		});

		const onHistoryItemClick = (name: string) => {
			if (Object.keys(HistoryData).includes(name)) {
				currentSection.value = name as IHistoryDataKeys;
			}
		};

		return (): VNode => (
			<article class="content-block">
				<header class="content-block__header">
					<a href="#" class="">
						<img src={Logo} alt="" />
					</a>
					<SvgIconCross class="content-block__close" onClick={contentBlockCloseHandler} />
				</header>

				<div class="content-block__main">
					<nav class="content-block__nav">
						<div class="nav">
							<ContentNavBlock title="Истории" navigation={navigationHistory} onNavItemClick={onHistoryItemClick} />
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
						{currentSection.value !== null ? (
							<>
								<h2>{HistoryData[currentSection.value].header as string}</h2>
								{HistoryData[currentSection.value].content.map(({ subject, text }) => {
									return (
										<>
											<h3>{subject}</h3>
											<p>{text}</p>
										</>
									);
								})}
							</>
						) : (
							<span>Выбери себе</span>
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
