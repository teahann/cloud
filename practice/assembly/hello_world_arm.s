.program
	ADR R0, message
	SWI "OS_Write0"
	SWI "OS_Exit"
.message
	EQUS "Hello, world!"
	EQUB 0
	ALIGN