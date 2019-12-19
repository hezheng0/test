let arr = [
	{ isCheck: true, phone: 123 },
	{ phone: 123 },
	{ isCheck: true, phone: 1234 }
];
arr.forEach(i => {
	if (i.isCheck) {
		console.log(i);
	}
});
