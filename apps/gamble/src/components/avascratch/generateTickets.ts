const singleTicket = [
	{
		numbers: [
			{ number: 99, scratched: false },
			{ number: 66, scratched: false },
			{ number: 28, scratched: false },
			{ number: 25, scratched: false },
			{ number: 69, scratched: false },
			{ number: 42, scratched: false },
			{ number: 65, scratched: false },
			{ number: 999, scratched: false },
			{ number: 11, scratched: false }
		]
	}
];

const multipleTickets = [
	{
		numbers: [
			{ number: 99, scratched: false },
			{ number: 66, scratched: false },
			{ number: 28, scratched: false },
			{ number: 25, scratched: false },
			{ number: 69, scratched: false },
			{ number: 42, scratched: false },
			{ number: 65, scratched: false },
			{ number: 999, scratched: false },
			{ number: 11, scratched: false }
		]
	}
];

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
