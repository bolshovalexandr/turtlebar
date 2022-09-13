<script lang="tsx">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'SvgIconCross',
	emits: {
		click: null
	},
	setup(_props, { emit }) {
		return () => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="34"
				height="34"
				viewBox="0 0 34 34"
				fill="none"
				onClick={() => emit('click')}
			>
				<path
					d="M1 1L33 33M1 33L33 1"
					stroke="#097435"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		);
	}
});
</script>
