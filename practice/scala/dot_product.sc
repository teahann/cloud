val inputs = Array(1.0, 2.0, 3.0, 2.5)
val weights = Array(Array(0.2, 0.8, -0.5, 1.0), Array(0.5, -0.91, 0.26, -0.5), Array(-0.26, -0.27, 0.17, 0.87))
val biases = Array(2.0, 3.0, 0.5)

(weights zip biases).foreach { case (w, b) => println(w.zip(inputs).map(p => p._1 * p._2).sum + b) }
