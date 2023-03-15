module.exports = {
	apps: [
		{
			name: "Self-Assessment",
			script: "./server.js",
			instances: "1",
			exec_mode: "cluster",
			watch: true,
			watch_delay: 1000,
			ignore_watch: ["node_modules"],
			env: {
				PORT: "8080",
			},
		},
	],
};
