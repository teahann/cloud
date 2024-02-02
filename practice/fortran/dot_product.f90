program DotProduct
	implicit none
	real, dimension(4) :: inputs = [1.0, 2.0, 3.0, 2.5]
	real, dimension(3,4) :: weights = reshape([0.2, 0.8, -0.5, 1.0, 0.5, -0.91, 0.26, -0.5, -0.26, -0.27, 0.17, 0.87], [3,4])
	real, dimension(3) :: biases = [2.0, 3.0, 0.5]
	real, dimension(3) :: outputs
	integer :: i

	outputs = matmul(weights,inputs) + biases

	do i = 1, size(outputs)
		print*, outputs(i)
	end do
end program DotProduct
