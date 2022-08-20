<template>
	<div class="wrapper">
		<div class="wrapper__content">
			<header class="header">
				<a href="#"><img class="header__logo" src="@/assets/logo.png" alt="" /></a>
				<h1 class="header__title">Бар "Черепаха-облепиха"</h1>
				<nav class="header__nav">
					<ul class="nav">
						<li class="nav__item"><a href="#" class="nav__link">Истории</a></li>
						<li class="nav__item"><a href="#" class="nav__link">Персонажи</a></li>
						<li class="nav__item"><a href="#" class="nav__link">Город</a></li>
					</ul>
				</nav>
			</header>
			<div class="map">
				<div class="hero hero--pavel" @click="isOpen = true">
					<img class="hero__avatar" src="@/assets/a_pavel.jpg" />
					<div class="hero__description">
						<h3 class="hero__name">Кот Павел</h3>
						<p class="hero__slogan">"дополнил Ньютона"</p>
						<a href="#" class="hero__link">история</a>
					</div>
				</div>
				<div class="hero hero--li">
					<img class="hero__avatar" src="@/assets/a_li.jpg" />
					<div class="hero__description">
						<h3 class="hero__name">Доктор Ли</h3>
						<p class="hero__slogan">"открыл закон сохранения стресса"</p>
						<a href="#" class="hero__link">история</a>
					</div>
				</div>
				<div class="hero hero--vyp">
					<img class="hero__avatar" src="@/assets/a_vyp.jpg" />
					<div class="hero__description">
						<h3 class="hero__name">Большая Выпь</h3>
						<p class="hero__slogan">"проклевала окно в Европу"</p>
						<a href="#" class="hero__link">история</a>
					</div>
				</div>
				<div class="hero hero--irukka">
					<img class="hero__avatar" src="@/assets/a_irukka.jpg" />
					<div class="hero__description">
						<h3 class="hero__name">Ирюкка</h3>
						<p class="hero__slogan">"фотографировала мистических существ"</p>
						<a href="#" class="hero__link">история</a>
					</div>
				</div>
				<SvgIconMap />
				<PopupComponent :isOpen="isOpen" @popup-close="onPopupCloseByDarkLayer" ref="popup">
					<template v-slot:content>
						<div>hello</div>
					</template>
					<template v-slot:buttons="{ popupCloseHandler }">
						<button>Перейти в группу</button>
						<button @click="popupCloseHandler">Совсем закрыть</button>
					</template>
				</PopupComponent>
				<ContentBlock :isShown="isContentBlockShown" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PopupComponent from './PopupComponent.vue';
import ContentBlock from './ContentBlock.vue';
import SvgIconMap from './svg/SvgIconMap.vue';

export default defineComponent({
	components: { SvgIconMap, PopupComponent, ContentBlock },
	name: 'TurtleLayout',
	data() {
		return {
			isContentBlockShown: false,
			isOpen: false
		};
	},
	methods: {
		onPopupCloseByDarkLayer() {
			console.log((this.$refs.popup as InstanceType<typeof PopupComponent>).onPopupClose);
			this.isOpen = false;
			// (this.$refs.popup as InstanceType<typeof PopupComponent>).$props['onPopup-close']();
		}
	}
});
</script>

<style lang="scss" scoped>
$HeroAvatarWidth: 48px;
$HeroTooltipWidth: 240px;
$TurtleGreen: #097435;
$TurtleOrange: #ff8800;
$Black: #191e27;
$Grey: #ccd3e5;
$DarkGrey: #a3a9b8;
$White: #ffffff;

.map {
	position: relative;
}
.wrapper {
	display: flex;
	justify-content: center;
	&__content {
		display: flex;
		flex-direction: column;
		flex: 1 0 auto;
		max-width: 1000px;
		margin: 0 16px;
		justify-content: center;
	}
}
.header {
	display: flex;
	align-items: center;
	height: 80px;
	&__logo {
		margin-right: 48px;
	}
	&__title {
		font-size: 24px;
	}
	&__nav {
		margin-left: auto;
	}
}

.nav {
	display: flex;
	font-size: 16px;
	text-transform: uppercase;
	list-style: none;
	&__item {
		margin-left: 16px;
		cursor: pointer;
	}
	&__link {
		color: $Black;
		transition: color 0.3s;
		&:hover {
			color: $DarkGrey;
		}
	}
}

.hero {
	position: absolute;
	display: inline-flex;
	&__avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		cursor: pointer;
	}
	&__description {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0;
		top: calc(100% + 16px);
		left: calc($HeroTooltipWidth / -2 + 24px);
		width: $HeroTooltipWidth;
		height: 100px;
		max-width: $HeroTooltipWidth;
		background-color: $White;
		border-radius: 4px;
		padding: 8px 12px;
		box-shadow: 0px 0px 8px 0px $DarkGrey;
		visibility: hidden;
		transition: all 0.35s ease-in;
		z-index: 1;
		&::after {
			display: block;
			position: absolute;
			width: 16px;
			height: 16px;
			content: '';
			left: calc($HeroTooltipWidth / 2 - 24px / 2 + 2px);
			top: -8px;

			transform: rotate(135deg);
			box-shadow: 1px -1px 0px 2px $White, -1px 1px 4px 0px $DarkGrey;
			z-index: 1;
			background: linear-gradient(45deg, $White 50%, transparent 50%, transparent 0%);
		}
	}
	&__name {
		font-size: 20px;
	}
	&__slogan {
		font-size: 12px;
		font-weight: 300;
	}
	&__link {
		margin-top: auto;
		font-size: 16px;
		font-weight: 600;
		color: $TurtleGreen;
		transition: color 0.3s;
		&:hover {
			color: $Black;
		}
	}
	&:hover .hero__description {
		visibility: visible;
		opacity: 1;
	}

	&--pavel {
		left: calc(10% - 36px / 2);
		top: calc((20 / 75) * 100% - $HeroAvatarWidth / 2);
	}
	&--li {
		left: calc(62% - 36px / 2);
		top: calc((32 / 75) * 100% - $HeroAvatarWidth / 2);
	}
	&--vyp {
		left: calc(54% - 36px / 2);
		top: calc((54 / 75) * 100% - $HeroAvatarWidth / 2);
	}
	&--irukka {
		left: calc(17% - 36px / 2);
		top: calc((53 / 75) * 100% - $HeroAvatarWidth / 2);
	}
}
.nav {
}
</style>
