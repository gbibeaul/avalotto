export default (num) => {
	if (num < 1) return;
	const matchingNumbersOrder = [
		[1, 2],
		[3, 8],
		[3, 6],
		[2, 8],
		[4, 5]
	];

	const tickets = [...Array(num)].map((ticketNum, ticketIndex) => {
		const ticket = {
			numbers: [...Array(9)].map(() => ({
				number: Math.ceil(Math.random() * 99),
				scratched: false
			}))
		};

		ticket.winningNumbers = [
			ticket.numbers[ticketIndex].number,
			matchingNumbersOrder[ticketIndex][0],
			matchingNumbersOrder[ticketIndex][1]
		];

		ticket.numbers[matchingNumbersOrder[ticketIndex][0]].number = ticket.numbers[0].number;
		ticket.numbers[matchingNumbersOrder[ticketIndex][1]].number = ticket.numbers[0].number;

		return ticket;
	});

	return tickets;
};
