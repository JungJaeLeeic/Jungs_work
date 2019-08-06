data <- matrix(0,500,3)
e <- matrix(0,500,1)


data[1:100,1] <- rnorm(100,2,1)
e[1:100] <- rnorm(100,0,3)
data[1:100,2] <- 20 + 1.8 * data[1:100,1]  + e[1:100]

data[101:200,1] <- rnorm(100,4,1)
e[101:200] <- rnorm(100,0,2)
data[101:200,2] <- 10 + 1.6 * data[101:200,1] + e[101:200]

data[201:300,1] <- rnorm(100,6,1)
e[201:300] <- rnorm(100,0,4)
data[201:300,2] <- -5 + 1.7 * data[201:300,1] + e[201:300]

data[301:400,1] <- rnorm(100,10,1)
e[301:400] <- rnorm(100,0,4)
data[301:400,2] <- -20 + 1.3 * data[301:400,1] + e[301:400]

data[401:500,1] <- rnorm(100,13,1)
e[401:500] <- rnorm(100,0,4)
data[401:500,2] <- -40 + 1.9 * data[401:500,1] + e[401:500]

data[1:100,3] <- 1
data[101:200,3] <- 2
data[201:300,3] <- 3
data[301:400,3] <- 4
data[401:500,3] <- 5

frame <- data.frame(data[,1],data[,2],data[,3])
colnames(frame) <- c("xdat", "ydat","set")

model <- lm(data[,2] ~ data[,1])
coef <- summary(model)$coefficients
model1 <- lm(data[1:100,2] ~ data[1:100,1])
coef1 <- summary(model1)$coefficients
model2 <- lm(data[101:200,2] ~ data[101:200,1])
coef2 <- summary(model2)$coefficients
model3 <- lm(data[201:300,2] ~ data[201:300,1])
coef3 <- summary(model3)$coefficients
model4 <- lm(data[301:400,2] ~ data[301:400,1])
coef4 <- summary(model4)$coefficients
model5 <- lm(data[401:500,2] ~ data[401:500,1])
coef5 <- summary(model5)$coefficients

library(ggplot2)
a <- ggplot(frame, aes( x= xdat, y= ydat)) + geom_point(aes(color = factor(set)))
a = a+ geom_abline(intercept = coef[1], slope = coef[2],color='purple')
plot(a)

a <- ggplot(frame, aes( x= xdat, y= ydat)) + geom_point(aes(color = factor(set)))
a = a+ geom_abline(intercept = coef1[1] , slope = coef1[2], color='red')
a = a+ geom_abline(intercept = coef2[1] , slope = coef2[2], color='brown')
a = a+ geom_abline(intercept = coef3[1] , slope = coef3[2], color='green')
a = a+ geom_abline(intercept = coef4[1] , slope = coef4[2], color='blue')
a = a+ geom_abline(intercept = coef5[1] , slope = coef5[2], color='purple')
plot(a)


modelcheck1 <- lm(data[1:200,2] ~ data[1:200,1])
coefcheck1 <- summary(modelcheck1)$coefficients

modelcheck2 <- lm(data[1:300,2] ~ data[1:300,1])
coefcheck2 <- summary(modelcheck2)$coefficients

modelcheck3 <- lm(data[1:400,2] ~ data[1:400,1])
coefcheck3 <- summary(modelcheck3)$coefficients

modelcheck4 <- lm(data[1:500,2] ~ data[1:500,1])
coefcheck4 <- summary(modelcheck4)$coefficients
