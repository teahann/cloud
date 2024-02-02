fn main() {
	let inputs = vec![1.0, 2.0, 3.0, 2.5];
	let weights = vec![
		vec![0.2, 0.8, -0.5, 1.0],
		vec![0.5, -0.91, 0.26, -0.5],
		vec![-0.26, -0.27, 0.17, 0.87],
	];
	let biases = vec![2.0, 3.0, 0.5];

	for (current_weights, bias) in weights.iter().zip(&biases) {
		let output: f64 = inputs
			.iter()
			.zip(current_weights)
			.map(|(input, weight)| input * weight)
			.sum::<f64>();
		println!("{}", output + bias);
	}
}
