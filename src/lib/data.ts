export const profile = {
	name: 'Kasyap Dharanikota',
	role: 'Backend Engineer',
	location: 'Hyderabad, IN',
	tz: 'Asia/Kolkata',
	email: 'kasyap3103@gmail.com',
	available: true,
	socials: [
		{ label: 'GitHub', handle: '@kasyap1234', href: 'https://github.com/kasyap1234' },
		{
			label: 'LinkedIn',
			handle: '/in/kasyap-dharanikota-7400a8203',
			href: 'https://www.linkedin.com/in/kasyap-dharanikota-7400a8203/'
		},
		{ label: 'X / Twitter', handle: '@kasyapdharanik1', href: 'https://twitter.com/kasyapdharanik1' },
		{ label: 'Email', handle: 'kasyap3103@gmail.com', href: 'mailto:kasyap3103@gmail.com' }
	]
};

export type Metric = { value: string; label: string };
export type Link = { label: string; href: string };

export type Project = {
	slug: string;
	idx: string;
	title: string;
	tagline: string;
	year: string;
	timeframe: string;
	category: string;
	role: string;
	stack: string[];
	href: string;
	links: Link[];
	from: string;
	to: string;
	highlights: Metric[];
};

export const projects: Project[] = [
	{
		slug: 'fastbrew',
		idx: '01',
		title: 'FastBrew',
		tagline:
			'A Go-powered Homebrew companion with instant search, parallel downloads, resumable installs, and a Bubbletea TUI.',
		year: '2026',
		timeframe: 'Jan 2026 — Mar 2026',
		category: 'Developer Tools',
		role: 'CLI / TUI Engineer',
		stack: ['Go', 'Bubbletea', 'Shell', 'Homebrew', 'HTTP Range'],
		href: 'https://github.com/kasyap1234/fastbrew',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/fastbrew' }],
		from: '#f4a23a',
		to: '#7a2e0e',
		highlights: [
			{ value: 'Go', label: 'primary language' },
			{ value: 'TUI', label: 'interactive mode' },
			{ value: 'Parallel', label: 'downloads' },
			{ value: 'Range', label: 'resume support' }
		]
	},
	{
		slug: 'deeptick',
		idx: '02',
		title: 'DeepTick',
		tagline:
			'AI stock research API using Elysia.js, LangChain DeepAgents, Exa search, and pgvector-backed memory.',
		year: '2026',
		timeframe: 'Feb 2026',
		category: 'AI · Research',
		role: 'AI Backend Engineer',
		stack: ['TypeScript', 'Bun', 'Elysia.js', 'LangChain', 'PostgreSQL', 'pgvector', 'Drizzle'],
		href: 'https://github.com/kasyap1234/deeptick',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/deeptick' }],
		from: '#caa8ff',
		to: '#3a1f6b',
		highlights: [
			{ value: '7', label: 'research agents' },
			{ value: '>90%', label: 'cache threshold' },
			{ value: 'pgvector', label: 'memory store' },
			{ value: 'Exa', label: 'web research' }
		]
	},
	{
		slug: 'edduhub',
		idx: '03',
		title: 'EdduHub',
		tagline:
			'Education platform with Go services, Next.js UI, Ory Kratos auth, PostgreSQL migrations, seeded demos, and Playwright verification.',
		year: '2026',
		timeframe: 'Feb 2025 — Jun 2026',
		category: 'EdTech Platform',
		role: 'Full-Stack Backend Lead',
		stack: ['Go', 'TypeScript', 'Next.js', 'PostgreSQL', 'Ory Kratos', 'Playwright', 'Docker'],
		href: 'https://github.com/edduhub/edduhub',
		links: [{ label: 'Repository', href: 'https://github.com/edduhub/edduhub' }],
		from: '#8fd3ff',
		to: '#144f86',
		highlights: [
			{ value: 'Go', label: 'backend' },
			{ value: 'Kratos', label: 'identity layer' },
			{ value: '4', label: 'demo roles' },
			{ value: '10', label: 'open issues' }
		]
	},
	{
		slug: 'webhook-service',
		idx: '04',
		title: 'Webhook Service',
		tagline:
			'Go webhook delivery service with event ingestion, subscription management, RabbitMQ workers, PostgreSQL, and HMAC-signed callbacks.',
		year: '2026',
		timeframe: 'Jun 2026',
		category: 'Event Infrastructure',
		role: 'Backend Engineer',
		stack: ['Go', 'Gin', 'RabbitMQ', 'PostgreSQL', 'Docker', 'HMAC-SHA256', 'Goose'],
		href: 'https://github.com/kasyap1234/webhook-service',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/webhook-service' }],
		from: '#d9f99d',
		to: '#365314',
		highlights: [
			{ value: '3', label: 'core APIs' },
			{ value: 'RabbitMQ', label: 'delivery queue' },
			{ value: 'HMAC', label: 'signed payloads' },
			{ value: 'Go 1.26', label: 'module target' }
		]
	},
	{
		slug: 'agromart',
		idx: '05',
		title: 'AgroMart',
		tagline:
			'Multi-tenant agricultural inventory platform with Go services, Next.js, PostgreSQL, Docker, analytics, and RBAC.',
		year: '2025',
		timeframe: 'Jul 2025 — Aug 2025',
		category: 'SaaS · Inventory',
		role: 'Full-Stack Backend Lead',
		stack: ['Go', 'Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'JWT'],
		href: 'https://github.com/kasyap1234/agromart',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/agromart' }],
		from: '#9be58a',
		to: '#1f5f3a',
		highlights: [
			{ value: '14', label: 'DB migrations' },
			{ value: 'RBAC', label: 'access control' },
			{ value: 'Next 15', label: 'frontend' },
			{ value: 'Go 1.24', label: 'backend' }
		]
	},
	{
		slug: 'stock-agent-langchain',
		idx: '06',
		title: 'Advanced Swing Trade Bot',
		tagline:
			'Python multi-agent trading analysis system with parallel agents, risk scoring, backtesting, and persistent learning.',
		year: '2025',
		timeframe: 'Dec 2025',
		category: 'AI · Finance',
		role: 'Agent Systems Engineer',
		stack: ['Python', 'LangChain', 'Groq', 'Gemini', 'Shell', 'Backtesting'],
		href: 'https://github.com/kasyap1234/stock-agent-langchain',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/stock-agent-langchain' }],
		from: '#7cc4ff',
		to: '#0e2f6b',
		highlights: [
			{ value: '6', label: 'specialized agents' },
			{ value: '3x', label: 'speed claim' },
			{ value: '20s', label: 'analysis target' },
			{ value: '1 star', label: '1 fork' }
		]
	},
	{
		slug: 'distributed-task-queue',
		idx: '07',
		title: 'Distributed Task Queue',
		tagline:
			'Scalable Go task queue with Redis job storage, PostgreSQL results, recurring jobs, worker pools, and backoff.',
		year: '2025',
		timeframe: 'Jul 2024 — Mar 2025',
		category: 'Distributed Systems',
		role: 'Backend Engineer',
		stack: ['Go', 'Redis', 'PostgreSQL', 'REST API', 'Viper', 'Cron'],
		href: 'https://github.com/kasyap1234/distributed-task-queue',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/distributed-task-queue' }],
		from: '#ff8f70',
		to: '#6b1f1f',
		highlights: [
			{ value: 'Redis', label: 'queue store' },
			{ value: 'Postgres', label: 'result store' },
			{ value: '10', label: 'default workers' },
			{ value: '5', label: 'retry cap' }
		]
	},
	{
		slug: 'url-shortner-microservice',
		idx: '08',
		title: 'URL Shortener Microservice',
		tagline:
			'Go URL-shortener microservice using gRPC, PostgreSQL, Redis caching, and mutex-protected access counts.',
		year: '2025',
		timeframe: 'Dec 2024 — Mar 2025',
		category: 'Microservices',
		role: 'Backend Engineer',
		stack: ['Go', 'gRPC', 'PostgreSQL', 'Redis', 'Mutexes'],
		href: 'https://github.com/kasyap1234/url-shortner-microservice',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/url-shortner-microservice' }],
		from: '#e8e2d4',
		to: '#3a3730',
		highlights: [
			{ value: 'gRPC', label: 'service API' },
			{ value: 'Redis', label: 'cache layer' },
			{ value: 'Postgres', label: 'storage' },
			{ value: 'Mutex', label: 'race guard' }
		]
	},
	{
		slug: 'polling-app',
		idx: '09',
		title: 'Real-Time Polling App',
		tagline:
			'Go WebSocket voting system with a central hub, goroutines, channels, client registration, and live broadcasts.',
		year: '2025',
		timeframe: 'Jan 2025 — Mar 2025',
		category: 'Realtime Systems',
		role: 'Realtime Backend Engineer',
		stack: ['Go', 'WebSocket', 'Goroutines', 'Channels', 'HTML'],
		href: 'https://github.com/kasyap1234/polling-app',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/polling-app' }],
		from: '#7bdff2',
		to: '#0b4f6c',
		highlights: [
			{ value: 'WS', label: 'live transport' },
			{ value: 'Hub', label: 'client manager' },
			{ value: '5k+', label: 'profile claim' },
			{ value: 'Go', label: 'primary language' }
		]
	},
	{
		slug: 'qrcode-generator',
		idx: '10',
		title: 'QR Code Generator API',
		tagline:
			'Go Echo backend that generates custom QR codes, retrieves QR images by ID, and returns batch results.',
		year: '2025',
		timeframe: 'May 2025',
		category: 'API Services',
		role: 'Backend API Engineer',
		stack: ['Go', 'Echo', 'REST API', 'Docker', 'Shell'],
		href: 'https://github.com/kasyap1234/qrcode-generator',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/qrcode-generator' }],
		from: '#ffd166',
		to: '#7a4f00',
		highlights: [
			{ value: '3', label: 'documented endpoints' },
			{ value: 'Batch', label: 'result lookup' },
			{ value: 'Echo', label: 'HTTP server' },
			{ value: 'PNG', label: 'QR output' }
		]
	},
	{
		slug: 'sys-info-cli',
		idx: '11',
		title: 'Sys Info CLI',
		tagline: 'Go command-line tool for CPU, RAM, disk, process, PID listing, and PID existence checks.',
		year: '2025',
		timeframe: 'Sep 2024 — Mar 2025',
		category: 'Developer Tools',
		role: 'CLI Engineer',
		stack: ['Go', 'YAML Config', 'Process APIs'],
		href: 'https://github.com/kasyap1234/sys-info-cli',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/sys-info-cli' }],
		from: '#b8f2e6',
		to: '#1d5c55',
		highlights: [
			{ value: '6', label: 'documented commands' },
			{ value: '1 fork', label: 'GitHub signal' },
			{ value: 'Go', label: 'primary language' },
			{ value: 'YAML', label: 'config file' }
		]
	},
	{
		slug: 'expense-tracker',
		idx: '12',
		title: 'Expense Tracker',
		tagline:
			'Secure multi-user expense tracker with JWT authentication, Google OAuth, isolated user data, and Dockerized services.',
		year: '2025',
		timeframe: 'Dec 2024 — Mar 2025',
		category: 'Full-Stack App',
		role: 'Full-Stack Engineer',
		stack: ['TypeScript', 'Go', 'JWT', 'Google OAuth', 'Docker', 'CSS'],
		href: 'https://github.com/kasyap1234/expense-tracker',
		links: [{ label: 'Repository', href: 'https://github.com/kasyap1234/expense-tracker' }],
		from: '#f7a8b8',
		to: '#6b1d3a',
		highlights: [
			{ value: 'JWT', label: 'auth' },
			{ value: 'OAuth', label: 'Google login' },
			{ value: 'Docker', label: 'deployment' },
			{ value: 'TypeScript', label: 'primary language' }
		]
	}
];

export const capabilities = [
	{
		k: 'A',
		title: 'APIs & Services',
		body: 'gRPC and HTTP services in Go — typed, load-tested, and observable from the first commit.'
	},
	{
		k: 'B',
		title: 'Distributed Systems',
		body: 'Event pipelines, queues, and state that stay correct under partition, retries, and load.'
	},
	{
		k: 'C',
		title: 'Data & Storage',
		body: 'Schema design, query tuning, and replication across PostgreSQL and MongoDB.'
	},
	{
		k: 'D',
		title: 'Observability & SRE',
		body: 'Prometheus, Grafana, tracing and SLOs — so failures are seen before users feel them.'
	}
];

export const experience = [
	{
		role: 'Software Engineer',
		org: 'Thoughtgreen Technologies',
		period: 'Sep 2024 — Present',
		note: 'Build scalable Go microservices, Kubernetes deployments, FastAPI AI/ML services, and Prometheus/Grafana observability.'
	},
	{
		role: 'Software Engineer',
		org: 'Comtek Solutions',
		period: 'Jul 2023 — Jul 2024',
		note: 'Developed Golang notification services with Kafka/RabbitMQ, monitoring, optimized Docker builds, and CI/CD automation.'
	},
	{
		role: 'Software Engineer',
		org: 'Jugyah',
		period: 'Feb 2023 — May 2023',
		note: 'Built Node.js backend services and AI-assisted property recommendation and price-prediction workflows.'
	}
];

export const stack = [
	'Go',
	'Python',
	'JavaScript',
	'TypeScript',
	'SQL',
	'Node.js',
	'NestJS',
	'Express',
	'React',
	'MongoDB',
	'PostgreSQL',
	'Redis',
	'Kafka',
	'RabbitMQ',
	'REST',
	'gRPC',
	'WebSockets',
	'OAuth2',
	'Docker',
	'Kubernetes',
	'Terraform',
	'AWS',
	'GitHub Actions',
	'GitLab CI/CD',
	'Prometheus',
	'Grafana',
	'ELK',
	'Bun ORM'
];
