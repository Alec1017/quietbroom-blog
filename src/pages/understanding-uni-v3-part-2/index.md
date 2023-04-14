---
title: Understanding Uniswap V3 - Part II
date: "2022-10-16"
intro: "What really happens when an LP provides liquidity?"
---

### Motivation

When providing liquidity on V3, an LP doesn't necessarily have to provide an equivalent amount of $x$ and $y$ tokens like how it was with V2. What an LP provides depends on the price range they specify and where the range is relative to the current price.

Each position that an LP creates is a mapping from an account address, lower bound, and upper bound to a liquidity value $L$. This liquidity will be combined later on, when the price crosses this particular LP's range, with all the other LPs to create a global $L$ value for swaps. 

So, depending on the range specified by the LP relative to the current price P, There are three different ways to compute this $L$ value, and therefore, how much of each $x$ and $y$ token to deposit.

1\. $P \leq P_{a}$, current price is below the LP's range

2\. $P_{b} \leq P$, current price is above the LP's range

3\. $P_{a} \le P \le P_{b}$, current price is within the LP's range

For each of these cases, we will see how much of token $x$ and token $y$ that an LP has to deposit when they specify some $P_{a}$ and $P_{b}$

### Calculate L when $P \leq P_{a}$

Here, we have a graph where $P$ is below $P_{a}$:

[SHOW GRAPH HERE]

From Part 1 in this series, we know that $y_{real}$ reserves become $0$ when the price reaches or exceeds $P_{a}$. So, for any price at $P_{a}$ or below, there are $0 y_{real}$ tokens in the LP position for this range. 

---

To solve for $L$, we take our concentrated liquidity function and specify that $y_{real}$ is 0 when $P \leq P_{a}$:

$$
(x_{real} + \frac{L}{\sqrt{P_{b}}})(0 + L \sqrt{P_{a}}) = L^{2} \longrightarrow (x_{real} + \frac{L}{\sqrt{P_{b}}})(L \sqrt{P_{a}}) = L^{2}
$$

Cancel out an $L$ on each side:

$$
(x_{real} + \frac{L}{\sqrt{P_{b}}}) \cdot \sqrt{P_{a}} = L
$$

Multiply out $\sqrt{P_{a}}$:

$$
x_{real} \cdot \sqrt{P_{a}} + L \cdot \frac{\sqrt{P_{a}}}{\sqrt{P_{b}}} = L
$$

Move $L$ to one side:

$$
x_{real} \cdot \sqrt{P_{a}} = L - L \cdot \frac{\sqrt{P_{a}}}{\sqrt{P_{b}}} 
$$

Divide both sides by $\sqrt{P_{a}}$:

$$
x_{real} = \frac{L}{\sqrt{P_{a}}} - L \cdot \frac{\sqrt{P_{a}}}{\sqrt{P_{b}} \cdot \sqrt{P_{a}}}
\longrightarrow
x_{real} = \frac{L}{\sqrt{P_{a}}} - \frac{L}{\sqrt{P_{b}}} 
$$

Factor out the binomial:

$$
x_{real} = \frac{L}{\sqrt{P_{a}}} \cdot \frac{\sqrt{P_{b}}}{\sqrt{P_{b}}} - \frac{L}{\sqrt{P_{b}}} \cdot \frac{\sqrt{P_{a}}}{\sqrt{P_{a}}}
\longrightarrow
x_{real} = L \cdot \frac{\sqrt{P_{b}} - \sqrt{P_{a}}}{\sqrt{P_{b}} \cdot \sqrt{P_{a}}}
$$

Solve for $L$ by cross multiplication:

$$
\frac{x_{real}}{L} = \frac{\sqrt{P_{b}} - \sqrt{P_{a}}}{\sqrt{P_{b}} \cdot \sqrt{P_{a}}}
\longrightarrow
L \cdot (\sqrt{P_{b}} - \sqrt{P_{a}}) = x_{real} \cdot (\sqrt{P_{b}} \cdot \sqrt{P_{a}})
$$

Finally:

$$
L = x_{real} \cdot \frac{\sqrt{P_{b}} \cdot \sqrt{P_{a}}}{\sqrt{P_{b}} - \sqrt{P_{a}}}
$$

We can see that calculating liquidity to provide only requires the deposit of $x_{real}$ tokens by the LP when price $P$ is below $P_{a}$.

### Calculate L when $P_{b} \leq P$

Here, we have a graph where $P$ is above $P_{b}$:

[SHOW GRAPH HERE]

From Part 1 in this series, we know that $x_{real}$ reserves become 0 when the price reaches or exceeds $P_{b}$. So, for any price at $P_{b}$ or higher, there are 0 $x_{real}$ tokens in the LP position for this range.

---

To solve for $L$, we take our concentrated liquidity function and specify that $x_{real}$ is $0$ when $P_{b} \leq P$:

$$
(0 + \frac{L}{\sqrt{P_{b}}})(y_{real} + L \sqrt{P_{a}}) = L^{2}
\longrightarrow
\frac{L}{\sqrt{P_{b}}} \cdot (y_{real} + L \sqrt{P_{a}}) = L^{2}
$$

Cancel out an $L$ on each side:

$$
\frac{1}{\sqrt{P_{b}}} \cdot (y_{real} + L \sqrt{P_{a}}) = L
$$

Multiply out $\frac{1}{\sqrt{P_{b}}}$:

$$
\frac{y_{real}}{\sqrt{P_{b}}} + L \cdot \frac{\sqrt{P_{a}}}{\sqrt{P_{b}}} = L
$$

Move $L$ to one side:

$$
\frac{y_{real}}{\sqrt{P_{b}}} = L + L \cdot \frac{\sqrt{P_{a}}}{\sqrt{P_{b}}}
$$

Multiply both sides by $\sqrt{P_{b}}$:

$$
y_{real} = L \cdot \sqrt{P_{b}} - L \cdot \frac{\sqrt{P_{a}} \cdot \sqrt{P_{b}}}{\sqrt{P_{b}}}
\longrightarrow
y_{real} = L \cdot \sqrt{P_{b}} - L \cdot \sqrt{P_{a}}
$$

Pull $L$ out of the binomial:

$$
y_{real} = L \cdot (\sqrt{P_{b}} - \sqrt{P_{a}})
$$

Finally: 

$$
L = \frac{y_{real}}{\sqrt{P_{b}} - \sqrt{P_{a}}}
$$

We can see that calculating liquidity to provide only requires the deposit of $y_{real}$ tokens by the LP when price $P$ is above $P_{b}$.

