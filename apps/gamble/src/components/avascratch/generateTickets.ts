export default (num) => {
	if (num < 1) return;

	const tickets = [...Array(num)].map(() => {
		return {
			numbers: [...Array(9)].map(() => ({
				number: Math.ceil(Math.random() * 99),
				scratched: false
			}))
		};
	});

	return tickets;
};
