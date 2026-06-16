export function reveal(
	node: HTMLElement,
	opts?: { delay?: number; threshold?: number }
) {
	node.classList.add('reveal');

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(
						() => node.classList.add('revealed'),
						opts?.delay ?? 0
					);
					observer.unobserve(node);
				}
			});
		},
		{ threshold: opts?.threshold ?? 0.15 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
}
