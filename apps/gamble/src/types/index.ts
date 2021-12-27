export interface Email_list {
	email?: string;
}

export interface Networks {
	name?: string;
	description?: string;
}

export interface Phases {
	value?: string;
	description?: string;
}

export interface Currencies {
	name?: string;
}

export interface Games {
	name?: string;
	description?: string;
	phase?: number /* foreign key to phases.id */;
	contract_address?: string;
	phases?: Phases;
}

export interface Event_type {
	game_id?: number /* foreign key to games.id */;
	name?: string;
	description?: string;
	games?: Games;
}

export interface Notification_targets {
	network_id?: number /* foreign key to networks.id */;
	enabled?: boolean;
	email?: string;
	discord?: string;
	browser?: boolean;
	signature?: string;
	networks?: Networks;
}

export interface Events {
	game_id?: number /* foreign key to games.id */;
	event_type?: number /* foreign key to event_type.id */;
	event_value?: any; // type unknown;
	currency?: number /* foreign key to currencies.id */;
	incentive_value: any; // type unknown;
	network?: number /* foreign key to networks.id */;
}
