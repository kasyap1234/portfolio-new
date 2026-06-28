// ------------------------------------------------------------
// Site content. Swap these values for your own.
// NOTE: social handles, employer names and the project write-ups
// are sensible placeholders — edit freely. Name, location and email
// are real.
// ------------------------------------------------------------

export const profile = {
	name: 'Kasyap Dharanikota',
	role: 'Backend Engineer',
	location: 'Hyderabad, IN',
	tz: 'Asia/Kolkata',
	email: 'kasyap3103@gmail.com',
	available: true,
	socials: [
		{ label: 'GitHub', handle: '@kasyapd', href: 'https://github.com' },
		{ label: 'LinkedIn', handle: '/in/kasyap', href: 'https://linkedin.com' },
		{ label: 'X / Twitter', handle: '@kasyapd', href: 'https://x.com' },
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
	links: Link[];
	from: string;
	to: string;
	summary: string;
	problem: string;
	approach: string[];
	highlights: Metric[];
	architecture: string[];
};

export const projects: Project[] = [
	{
		slug: 'helios',
		idx: '01',
		title: 'Helios',
		tagline: 'Multi-region event ingestion handling 2.4B events a day.',
		year: '2025',
		timeframe: '2024 — 2025',
		category: 'Distributed Systems',
		role: 'Lead Backend Engineer',
		stack: ['Go', 'Kafka', 'AWS', 'ScyllaDB', 'Prometheus', 'Grafana'],
		links: [
			{ label: 'Case study', href: '#' },
			{ label: 'Architecture', href: '#' }
		],
		from: '#f4a23a',
		to: '#7a2e0e',
		summary:
			'Helios is the ingestion backbone that accepts, validates, and routes device telemetry into the analytics platform — without dropping a message.',
		problem:
			'The legacy queue pipeline buckled past 30k events/sec, lost data during deploys, and had no backpressure. We needed an order-of-magnitude more throughput with at-least-once guarantees and zero-downtime releases.',
		approach: [
			'Rewrote the hot path in Go with a lock-free ring buffer and batched writes, driving per-event allocation to near zero.',
			'Introduced Kafka as a durable log with consumer-group backpressure and partition-aware routing.',
			'Made releases zero-downtime via graceful draining and in-flight checkpointing.',
			'Instrumented everything with Prometheus and shipped Grafana SLO dashboards with burn-rate alerts.'
		],
		highlights: [
			{ value: '2.4B', label: 'events / day' },
			{ value: '9ms', label: 'p99 ingest' },
			{ value: '99.99%', label: 'delivery' },
			{ value: '−68%', label: 'infra cost' }
		],
		architecture: [
			'Stateless Go ingest nodes behind an NLB, autoscaled on Kafka consumer lag.',
			'ScyllaDB for hot storage, tiered to S3 for cold archival.',
			'Idempotency keys + a dedup window for effectively-once delivery.'
		]
	},
	{
		slug: 'atlas',
		idx: '02',
		title: 'Atlas',
		tagline: 'Internal platform that cut deploys from 40 minutes to 4.',
		year: '2024',
		timeframe: '2022 — 2024',
		category: 'Developer Platform',
		role: 'Platform Engineer',
		stack: ['Go', 'Kubernetes', 'GCP', 'gRPC', 'Prometheus', 'Grafana'],
		links: [{ label: 'Overview', href: '#' }],
		from: '#7cc4ff',
		to: '#0e2f6b',
		summary:
			'A self-service deploy and environment platform giving 60+ engineers a golden path to production.',
		problem:
			'Teams hand-rolled CI, secrets, and Kubernetes manifests. Onboarding a new service took days and broke in subtle, recurring ways.',
		approach: [
			'Built a Go control plane that reconciles desired service state into Kubernetes.',
			'Generated manifests, dashboards, and alerts from a single declarative service spec.',
			'Added progressive delivery with automated rollback on SLO burn.',
			'Shipped a CLI and gRPC API covering the full service lifecycle.'
		],
		highlights: [
			{ value: '40→4m', label: 'deploy time' },
			{ value: '60+', label: 'engineers' },
			{ value: '300+', label: 'services' },
			{ value: '−90%', label: 'rollback toil' }
		],
		architecture: [
			'Operator pattern with custom CRDs for services and environments.',
			'Spec-driven generation of manifests, dashboards, and alert rules.',
			'Multi-cluster GCP with regional failover.'
		]
	},
	{
		slug: 'ledger',
		idx: '03',
		title: 'Ledger',
		tagline: 'A double-entry ledger that never loses a cent.',
		year: '2024',
		timeframe: '2023 — 2024',
		category: 'Fintech · Data',
		role: 'Backend Engineer',
		stack: ['Go', 'PostgreSQL', 'gRPC', 'GCP', 'Terraform'],
		links: [{ label: 'Write-up', href: '#' }],
		from: '#9be58a',
		to: '#1f5f3a',
		summary:
			'A strongly-consistent accounting core powering wallets, payouts, and reconciliation for a payments product.',
		problem:
			'Money movement was spread across services with eventual consistency — causing balance drift, manual reconciliation, and audit pain.',
		approach: [
			'Modeled every movement as immutable double-entry postings in PostgreSQL.',
			'Used serializable transactions and advisory locks to protect invariants.',
			'Exposed a typed gRPC API with idempotent, replay-safe operations.',
			'Ran a continuous reconciliation job proving debits equal credits.'
		],
		highlights: [
			{ value: '0', label: 'cents drifted' },
			{ value: '4M+', label: 'postings / day' },
			{ value: '<20ms', label: 'p99 write' },
			{ value: '100%', label: 'audit pass' }
		],
		architecture: [
			'Append-only postings table, partitioned by month.',
			'Transactional outbox for event publishing.',
			'Point-in-time balances via materialized snapshots.'
		]
	},
	{
		slug: 'quill',
		idx: '04',
		title: 'Quill',
		tagline: 'Realtime sync backend for collaborative editing.',
		year: '2023',
		timeframe: '2022 — 2023',
		category: 'Realtime Systems',
		role: 'Backend Engineer',
		stack: ['TypeScript', 'Node', 'MongoDB', 'Redis', 'WebSocket'],
		links: [{ label: 'Demo', href: '#' }],
		from: '#caa8ff',
		to: '#3a1f6b',
		summary:
			'The sync layer keeping thousands of concurrent editors consistent with sub-100ms propagation.',
		problem:
			'Concurrent edits clobbered one another and presence was unreliable once a document had more than a handful of active users.',
		approach: [
			'Implemented CRDT-based merge with lightweight server arbitration.',
			'Fanned changes out through Redis pub/sub across socket nodes.',
			'Persisted document state and history in MongoDB via change streams.',
			'Added presence and cursor sharing with heartbeat-based GC.'
		],
		highlights: [
			{ value: '<100ms', label: 'sync p95' },
			{ value: '8k', label: 'concurrent / doc' },
			{ value: '0', label: 'lost edits' },
			{ value: '12M', label: 'documents' }
		],
		architecture: [
			'Stateless WebSocket nodes, sticky by document id.',
			'Redis as the realtime fan-out bus.',
			'MongoDB change streams for persistence and replay.'
		]
	},
	{
		slug: 'cardinal',
		idx: '05',
		title: 'Cardinal',
		tagline: 'Anomaly detection over 100M metrics a minute.',
		year: '2022',
		timeframe: '2021 — 2022',
		category: 'Data · ML',
		role: 'Backend Engineer',
		stack: ['Python', 'PostgreSQL', 'AWS', 'Airflow', 'Grafana'],
		links: [{ label: 'Paper', href: '#' }],
		from: '#e8e2d4',
		to: '#3a3730',
		summary:
			'A streaming anomaly-detection service that flags incidents before static alerts ever fire.',
		problem:
			'Threshold alerts drowned on-call in false positives while quietly missing slow regressions.',
		approach: [
			'Built feature pipelines in Python over a metrics firehose.',
			'Trained per-series seasonal + residual models with shadow evaluation.',
			'Orchestrated backfills and training with Airflow on AWS.',
			'Surfaced scores into Grafana with an analyst feedback loop.'
		],
		highlights: [
			{ value: '−74%', label: 'false positives' },
			{ value: '100M', label: 'metrics / min' },
			{ value: '2.5m', label: 'median detect' },
			{ value: '40+', label: 'teams served' }
		],
		architecture: [
			'Kinesis → Python workers → a PostgreSQL feature store.',
			'Model registry with shadow evaluation before promotion.',
			'Grafana panels that capture analyst feedback as labels.'
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
		role: 'Senior Backend Engineer',
		org: 'Stratus',
		period: '2023 — Now',
		note: 'Own the ingestion and storage layer behind a high-volume analytics platform.'
	},
	{
		role: 'Backend Engineer',
		org: 'Northwind',
		period: '2021 — 2023',
		note: 'Built payments infrastructure and the internal developer platform.'
	},
	{
		role: 'Software Engineer',
		org: 'Hatch Labs',
		period: '2019 — 2021',
		note: 'Shipped APIs and data services across a handful of early-stage products.'
	}
];

export const stack = [
	'Go',
	'TypeScript',
	'Python',
	'gRPC',
	'PostgreSQL',
	'MongoDB',
	'Redis',
	'Kafka',
	'RabbitMQ',
	'AWS',
	'GCP',
	'Docker',
	'Kubernetes',
	'Prometheus',
	'Grafana',
	'Terraform'
];
