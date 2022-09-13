<script lang="tsx">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'SvgIconMap',
	setup() {
		return () => (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" fill="none">
				<g id="Map" filter="url(#filter0_b_216_2)">
					<ellipse id="pavel" cx="10" cy="20" rx="0.1" ry="0.1" fill="red" />
					<ellipse id="li" cx="62" cy="32" rx="0.1" ry="0.1" fill="red" />
					<ellipse id="vyp" cx="54" cy="56" rx="0.1" ry="0.1" fill="red" />
					<ellipse id="irukka" cx="17" cy="53" rx="0.1" ry="0.1" fill="red" />
					<path
						id="MainLand"
						d="M78.1498 52.8837L99.9992 49.5305V75H53.1735L44.5297 70.5182L78.1498 52.8837Z"
						fill="#1BC268"
						fill-opacity="0.25"
					/>
					<path
						id="BehindTheDridge"
						d="M15.5176 50.8901L31.6 62.75L29.6278 75.0001H0V55.8635L15.5176 50.8901Z"
						fill="#1BC268"
						fill-opacity="0.25"
					/>
					<path
						id="City"
						d="M57.2608 0L99.9999 2.24972V38.0124L43.05 63.95L15.2 44.7L26.1913 19.2777L57.2608 0Z"
						fill="#1BC268"
						fill-opacity="0.25"
					/>
					<path
						id="Techno"
						d="M17.2299 9.30408L22.2598 17.1005L10.7544 41.4595H0.0999756V9.30408H17.2299Z"
						fill="#1BC268"
						fill-opacity="0.25"
					/>
				</g>
				<defs>
					<filter
						id="filter0_b_216_2"
						x="-4"
						y="-4"
						width="108"
						height="83"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImage" stdDeviation="2" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_216_2" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_216_2" result="shape" />
					</filter>
				</defs>
			</svg>
		);
	}
});
</script>
