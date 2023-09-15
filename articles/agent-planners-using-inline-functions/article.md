### Introduction

The concept of agent planners has garnered attention. These agents, designed to interact with specific domains and private data, promise a level of interaction akin to human expertise. However, while their potential is evident, their current implementations often fall short when faced with the intricate demands of domain-specific tasks.

Agent planners play a pivotal role in deciphering and executing tasks. They act as the brain, interpreting user prompts and orchestrating a series of actions to fulfill the request. Central to this orchestration are functions - predefined sets of instructions that the planner can call upon. But relying solely on static functions can be limiting. As we delve deeper, we'll explore these limitations and how inline functions can offer a more dynamic and flexible solution.

This exploration isn't merely about data retrieval; it's about comprehension, processing, and computations. The question arises: why do these domain-specific agents falter, and how can their design be refined? Let's dive in to address these challenges and propose a pragmatic approach to enhance their capabilities.

### The Shortcomings of Domain-Specific Agents

In the realm of software design, we imagined domain-specific agents as the ideal intermediaries between users and complex application tasks. Tailored for distinct domains, these agents were designed to offer a streamlined interface for users to navigate intricate applications.

Yet, the practical outcomes have been far from this vision. Here's why:

1. __Limited Data Interaction__: Agents can pull data, but they often stumble with complex data structures. This makes it tough to extract meaningful information or provide clear answers.
1. __Data Processing Challenges__: It's not just about fetching data; agents must also process it. They struggle with tasks like column aggregation or advanced data computations.
1. __Fixed Functionality__: Many agents are bound by a set list of functions for data interaction. This lack of flexibility hampers their ability to adapt to varied user requests.
1. __SQL-like Queries__: Agents generating SQL-style queries face hurdles when data is spread across multiple platforms. Integrating related but separate data sources becomes a significant challenge.

These issues underscore the gap between what we hoped domain-specific agents would achieve and their actual performance. A new strategy is clearly needed.

### The Limitations of Static Functions in Handling Collections and Data Interpretation

When designing agents, a common approach is to rely on static functions, especially for tasks that involve data federation, extraction and manipulation. However, several challenges arise:

1. __Handling Collections__: Static functions that return collections, such as arrays, pose a unique challenge for agent planners. These planners are inherently designed for sequential operations, not for complex operations on collections like filtering or reducing. To address this, developers often find themselves in a loop, constantly introducing new static functions to handle the nuances of collection operations. This leads to an ever-expanding and increasingly complex set of functions, making maintenance and scalability a concern.
1. __Data Interpretation__: Another limitation surfaces when agents need to interpret data from previous static function responses. Instead of directly accessing and manipulating the raw data, agents often make additional calls to the LLM for interpretation. This approach has several drawbacks:

    * The LLM's interpretation, being in natural language, breaks the continuous data path in the plan, making subsequent operations on the data more challenging.
    * When dealing with large or complex datasets, relying on the LLM for interpretation can be inefficient and can lead to loss of context or granularity.
    * Multiple trips to the LLM for data interpretation not only introduce latency but also increase costs due to token consumption. This makes the entire process less efficient and more expensive.

Popular agent frameworks like [LangChain](https://www.langchain.com/) and [Semantic Kernel](https://github.com/microsoft/semantic-kernel) further exemplify these challenges. In both frameworks, static functions rarely describe their output format or the schema associated with their output. Instead, it's predominantly the LLM that interprets their output. This approach, as we've outlined, presents significant issues when creating domain-specific agents, especially when the goal is to achieve efficient and context-aware data interpretation.

In essence, for a plan to be truly effective, it should be executable in a zero-shot manner, without the need for continuous LLM invocations for data interpretation. Relying heavily on static functions and LLM interpretations can hinder the agent's efficiency, adaptability, and cost-effectiveness.

### Exploring the Potential of Inline Pure Functions

Imagine a scenario where, instead of relying on a fixed set of predefined functions, an LLM could dynamically generate a function tailored to your specific needs. What if, based on your prompt, the LLM could craft a function like this:

```js
function sortProductsByPrice(products) {
  return products.sort((a, b) => a.price - b.price);
}
```

Of course, this example is quite trivial. Sorting can be easily achieved with a static function. However, as user prompts become more intricate, the need for multiple functions and customization of those functions via parameters grows. This simple example is merely illustrative, showcasing the potential of inline pure functions in more complex scenarios.

These aren't just static functions predefined for general use cases. They're dynamic, tailored to the specific requirements of a user's prompt, and crafted by the LLM in real-time. And here's an exciting aspect: GPT models excel at producing such pure functions, making them a perfect fit for this approach.

Such a capability could change how we create domain-specific agents. But what makes this feasible? The concept of pure functions. In computer science, a pure function is one that doesn't have side effects. It doesn't perform I/O operations, mutate external state, or cause any other observable side effects. There's a wealth of research on this concept, and concrete implementations of it, e.g.: Secure EcmaScript (SES) uses this concept extensibly.

With this foundation, let's delve into the potential benefits of this approach:

1. __Flexibility and Adaptability__: Inline pure functions offer dynamic solutions tailored to the user's prompt, bypassing the constraints of predefined functions.
1. __Complementing Static Functions__: These functions aren't meant to replace static ones but to complement them. While static functions provide a stable interface to access data sources, inline functions handle intricate, prompt-specific manipulations.
1. __Safety and Security__: Given their nature, pure functions generated by the LLM might not pose security risks, especially if executed in isolated environments.
1. __Efficiency in Data Handling__: Inline pure functions can streamline data interpretation, reducing latency and token consumption while preserving data's context and granularity.

This conceptual framework, rooted in observations and discussions, holds promise. Yet, it awaits rigorous testing and validation.

### Integrating Inline Pure Functions into Existing Systems

The beauty of the inline pure functions approach is that it doesn't necessitate a complete overhaul of existing systems. Instead, it can be integrated to enhance and simplify the current agent planner mechanisms. Here's how I envision this integration:

1. __Data Access Layer__: At the foundation, there would be a data access layer. This layer would expose static functions that allow agents to fetch data from various sources. These functions would be simple, direct, and would return data in a structured format, ready for manipulation.
1. __Function Generation__: Upon receiving a user's prompt, the LLM would determine if an inline pure function is required. If so, it would generate this function based on the specific needs of the prompt. This function would be designed to operate on the data fetched by the static functions.
1. __Execution Environment__: The generated inline pure function would be executed in a controlled environment. This could be a client-side runtime or a dedicated worker thread, ensuring isolation and security. The function would take in the required data, process it, and return the results.
1. __Data Flow and Integration__: The results from the inline pure function can then be integrated into the agent's plan. Since the function is pure, there's a guarantee that it won't have side effects or alter the state of the system. This makes the integration seamless and predictable.
1. __Optimization and Efficiency__: With the ability to generate functions on-the-fly, there's potential for optimization. The LLM can generate functions that are tailored to the specific needs of a prompt, ensuring efficient data processing. This reduces the need for overly complex static functions and can lead to faster response times.
1. __Extensibility__: As new data sources or functionalities are added to a system, the static functions in the data access layer can be updated or extended. The inline pure functions approach remains flexible and can adapt to these changes without major disruptions.

In essence, this approach aims to provide a bridge between the static, predefined world of data access and the dynamic, adaptable world of user prompts. It offers a way to harness the power of the LLM in a controlled, efficient, and secure manner.

The true magic behind these inline functions is rooted in the capabilities of a Large Language Model (LLM). When a user issues a prompt, the agent furnishes the LLM with type definitions for all domain-specific data structures. Armed with this information, the LLM interprets the prompt, discerning the user's intent. Based on this interpretation, it crafts a plan replete with the necessary logic, including any inline functions required for the plan's execution. This process marries natural language processing with a profound understanding of the domain at hand. Take our product sorting example: the LLM identified a need for a sorting operation on a list of products based on price. With knowledge of the data structure's schema, the LLM can generate an inline function that leverages this structure. This newly produced data structure can then be seamlessly integrated into other static functions as part of the overarching plan.

### A Practical Example: Analyzing Sales Data for Visualization

In the e-commerce domain, visualizing sales trends can offer invaluable insights. For instance, a business owner using Shopify might want to visually compare sales between weekdays and weekends over a span of five weeks to evaluate weekends campaings.

Given the following prompt:

> Can you plot the sales comparison between weekdays and weekends for the past five weeks

Here's how an agent plan might look using this approach:

```json
{
  "@steps": [
    {
      "@func": "FetchProductSales",
      "@args": [
        {
          "timeframe": [5, "weeks"]
        }
      ]
    },
    {
      "@func": "InlineFunction",
      "@args": [
        "function (sales) { \
          let results = { \
            xValues: [], \
            yValues: { 'Weekday Revenue': [], 'Weekend Revenue': [] }, \
            labels: ['Weekday Revenue', 'Weekend Revenue'] \
          }; \
          let currentDate = new Date(Date.now()); \
          for(let i = 0; i < 5; i++) { \
            let startOfWeek = new Date(currentDate - (i * 7 * 24 * 60 * 60 * 1000)); \
            let endOfWeek = new Date(startOfWeek - (7 * 24 * 60 * 60 * 1000)); \
            let weekdayRevenue = 0; \
            let weekendRevenue = 0; \
            let weekSales = sales.filter(sale => new Date(sale.date) >= endOfWeek && new Date(sale.date) <= startOfWeek); \
            weekSales.forEach(sale => { \
              if ([0, 6].includes(new Date(sale.date).getDay())) { \
                weekendRevenue += sale.revenue; \
              } else { \
                weekdayRevenue += sale.revenue; \
              } \
            }); \
            results.xValues.push(startOfWeek); \
            results.yValues['Weekday Revenue'].push(weekdayRevenue); \
            results.yValues['Weekend Revenue'].push(weekendRevenue); \
          } \
          return results; \
        }",
        {
          "@ref": 0
        }
      ]
    },
    {
      "@func": "ShowGraph",
      "@args": [
        "Sales Comparison: Weekdays vs Weekends",
        {
          "@ref": 1
        }
      ]
    }
  ]
}
```

In this plan:

1. We fetch the sales data for the past five weeks using the `FetchProductSales` function.
1. An inline function processes this data. For each week, it segregates and aggregates the sales based on whether they occurred on a weekday or weekend, producing a data structure that matches the input of `ShowGraph` static function.
1. The processed data is then passed to the `ShowGraph` function, which plots the revenue trends for weekdays and weekends over the five-week period.

This example demonstrates the synergy between static and inline functions. The static function provides the raw data, while the inline function enables domain-specific computations. The final visualization offers a clear, concise view of sales trends without the need for multiple LLM interactions.

Trying to achieve the same result with static functions alone, or even SQL-like mechanisms, would be challenging. The static functions would need to be designed to handle the nuances of data processing. Relying solely on them would necessitate the creation of more utility functions, complicating the overall system. Yet, even with these additions, it might still fall short of covering the vast range of possibilities inherent in a system designed to understand natural language and produce answers to arbitrary questions related to your data.

### Challenges and Potential Issues

#### 1. Validation Complexity

The approach, while promising, introduces a new layer of complexity in terms of validation. Ensuring that inline functions are both safe and effective requires rigorous testing. Unlike static functions, which can be predefined and thoroughly vetted, inline functions are dynamic and can vary greatly. This makes the validation process more intricate.

#### 2. Reliance on Advanced Frameworks

While the concept is sound, its practical implementation heavily relies on advanced frameworks like [TypeChat](https://github.com/microsoft/TypeChat). While TypeChat is the closest tool that aligns with this vision, it's still in its nascent stages. [TypeChat](https://github.com/microsoft/TypeChat) does allow production of inline functions but does not validate them as part of the [TypeScript](https://www.typescriptlang.org) analysis. This is a critical step that needs to be addressed before this approach can be fully realized.

#### 3. Security Implications

Allowing dynamic code execution within plans can pose security risks. Ensuring that no malicious code gets executed is paramount. The transformation of the plan from a JSON string to a JS code that contains functions that were validated by [TypeChat](https://github.com/microsoft/TypeChat) via [TypeScript](https://www.typescriptlang.org) engine seems possible. However, this is an area that requires further exploration. Evaluation of the JS code might be done in a sandboxed environment, like a worker thread, a detached iframe, a ShadowRealm, or any similar approach, to mitigate potential threats.

### Conclusion

The landscape of agent planning is evolving, and the introduction of inline functions within plans presents a promising direction. While it offers a more flexible and dynamic approach to handling user prompts, it's not without its challenges. Tools like [TypeChat](https://github.com/microsoft/TypeChat) are pioneering this space, but the journey is just beginning. As with any innovative approach, it will require continuous refinement, adaptation, and a community of forward-thinkers to realize its full potential.
