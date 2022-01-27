export default (num) => {
	if (num < 1) return;

	const tickets = [...Array(num)].map(() => {
		const ticket = {
			numbers: [...Array(9)].map(() => ({
				number: Math.ceil(Math.random() * 99),
				scratched: false
			}))
		};

		ticket.numbers[1].number = ticket.numbers[0].number;
		ticket.numbers[2].number = ticket.numbers[0].number;

		return ticket;
	});

	return tickets;
};
