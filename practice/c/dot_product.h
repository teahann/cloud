#include<stdio.h>

int main()
{
	double inputs[] = {1, 2, 3, 2.5};
	double weights[3][4] = {
		{0.2, 0.8, -0.5, 1.0},
		{0.5, -0.91, 0.26, -0.5},
		{-0.26, -0.27, 0.17, 0.87}
	};
	double biases[] = {2, 3, 0.5};
	double output[3] = {0, 0, 0};

	for(int i = 0; i < 3; i++) {
		for(int j = 0; j < 4; j++) {
			output[i] += weights[i][j] * inputs[j];
		}
		output[i] += biases[i];
	}

	printf("%f %f %f\n", output[0], output[1], output[2]);
	return 0;
}
