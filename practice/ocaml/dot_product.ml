let inputs = [1.0; 2.0; 3.0; 2.5];;
let weights = [[0.2; 0.8; -0.5; 1.0]; [0.5; -0.91; 0.26; -0.5]; [-0.26; -0.27; 0.17; 0.87]];;
let biases = [2.0; 3.0; 0.5];;

let rec print_float_list = function 
[] -> ()
| e::l -> print_float e ; print_string " " ; print_float_list l;;

let dot_product v1 v2 = List.fold_left (+.) 0. (List.map2 ( *. ) v1 v2);;
let outputs = List.map2 (fun w b -> dot_product w inputs +. b) weights biases;;

print_float_list outputs;;
