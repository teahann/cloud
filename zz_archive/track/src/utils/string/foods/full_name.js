
export const full_name = food => {
	return [
		food.brandOwner,
		food.description,
		food.foodCategory
	].filter(Boolean).join(' - ')
}
