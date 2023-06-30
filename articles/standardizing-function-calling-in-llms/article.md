### Introduction

In the field of artificial intelligence, large language models (LLMs) have emerged as powerful tools capable of understanding and generating human-like text. Their applications span diverse domains, from answering questions and writing code to translating languages and creating poetry. Among these LLMs, open-source models like [Meta's Llama](https://ai.facebook.com/blog/large-language-model-llama-meta-ai/) have democratized access to advanced AI capabilities, fueling a surge in development and deployment across various platforms.

Despite their impressive capabilities, LLMs primarily interact with the outside world through input/output (IO) mechanisms. One such IO mechanism gaining traction is [function calling](https://openai.com/blog/function-calling-and-other-api-updates), which provides a structured way for LLMs to interact with external systems and processes. Function calling empowers LLMs to not only understand and respond to prompts but also execute specific functions based on the user's input.

However, function calling is not consistently available or uniformly implemented across different LLMs, forcing popular frameworks like [LangChain](https://python.langchain.com/docs/get_started/introduction.html) or [Semantic Kernel](https://github.com/microsoft/semantic-kernel) to either create abstractions that can only work with _gpt-3.5-turbo-0301_ and _gpt-4-0314_, or implement synthetic function calling capabilities through prompts that are subject to all sorts of problems. This inconsistency can lead to interoperability challenges and missed opportunities for enhanced utility. As such, there is a growing need to standardize function calling in LLMs, allowing them to reliably and predictably interact with the world, irrespective of the underlying model or platform.


### The Benefits of Standardizing Function Calling in LLMs

As we stand on the threshold of widespread adoption of LLMs in various sectors, standardization of function calling presents a unique opportunity to streamline and enhance the utility of these AI systems.



1. **Enhanced Interoperability**: A standardized function calling mechanism across LLMs would ensure a consistent interaction model regardless of the underlying AI system. This uniformity could facilitate seamless integration of different LLMs into a wide array of applications and platforms, fostering an ecosystem of interoperable AI solutions.
2. **Promotes Innovation and Competition**: With a standardized framework, developers and researchers can focus on refining the capabilities of their LLMs rather than grappling with proprietary or incompatible function calling methods. This environment encourages competition and innovation, as the ease of swapping one LLM for another fosters a marketplace where the best models can rise to the top.
3. **Facilitates the Creation of DSLs and Agents**: A standardized approach to function calling enables the definition of domain-specific languages (DSLs) and the creation of intelligent agents. By ensuring LLMs understand the input/output schema of functions, we pave the way for LLMs to generate programs aligned with DSLs and plan complex, multi-step operations. This could significantly expand the utility of LLMs, pushing the boundaries of what they can accomplish.
4. **Enables Robust and Reliable IO Mechanisms**: Standardizing function calling ensures reliable and robust IO mechanisms for LLMs, which is vital for their effective integration into real-world applications. A function's response schema, when standardized, could help LLMs better interpret the response and take appropriate action, enhancing their utility and reliability in various tasks.

In essence, standardizing function calling in LLMs could catalyze an era of enhanced AI interoperability, innovation, and utility, making AI more accessible and effective for a wider range of applications.


### Current Limitations of Function Calling in LLMs

While [function calling](https://openai.com/blog/function-calling-and-other-api-updates) is an exciting feature in **GPT-3** and **GPT-4** models, it is still in the early stages and has a few limitations, especially in dealing with structured data. Currently, developers can describe functions to the model and have it generate calls to these functions with provided arguments. These functions can range from simple tasks, such as sending an email or querying the weather, to more complex ones like converting natural language into API calls or database queries, and even extracting structured data from text.

However, the function calling feature in its current form focuses primarily on the input format, i.e., the arguments passed to the function. This approach can be restrictive as the language model does not have a clear understanding of the expected output or response format of these functions. As such, the model may not interpret structured data from the function responses effectively, which can potentially hinder the flow of conversation or the execution of subsequent tasks.

Therefore, to fully harness the potential of function calling in large language models, it is crucial to extend this feature to include the definition of output or response format for each function. This would enable the models to better interpret structured data, opening up the possibility for more advanced use cases, such as reasoning sequences and strategies, and the creation of domain-specific languages​.


### The Importance of a Standard Training Dataset for Fine-Tuning

One critical aspect of this proposal is the creation of a standard training dataset for the fine-tuning of LLMs. Fine-tuning is a crucial step in the development of language models, allowing them to specialize and perform specific tasks beyond the capabilities of the base model.

For function calling in LLMs, a standardized training dataset will provide a consistent ground for models to learn how to interact with external functions. This dataset would be designed to expose the models to a wide variety of function calling scenarios, ensuring that they can handle a diverse range of function calls effectively and accurately.

This concept is not unprecedented. [ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) and [Test262](https://github.com/tc39/test262) have played similar roles in the JavaScript ecosystem, guiding the development and testing of JavaScript implementations. In the same vein, a standard training dataset for function calling in LLMs will ensure that all models, regardless of their source or base architecture, can be fine-tuned to understand and implement function calling consistently.

The creation of such a dataset will be a collaborative effort, requiring input from a wide range of stakeholders in the AI community. The dataset will need to be comprehensive, diverse, and representative of real-world function calling scenarios to effectively guide the fine-tuning process.

By providing this training resource, we can ensure that function calling capabilities become a standard feature across all LLMs, opening up new possibilities for their application and interaction.


### Unlocking New Possibilities with Standardized Function Calling

A standardized function calling system for LLMs would do more than just streamline interoperability and ease of use. It opens up a host of exciting possibilities that could revolutionize how we interact with and leverage AI.



1. **Advanced Agent Interactions**: Standardizing function calling in LLMs would allow the development of more advanced agent interactions. Agents could execute a sequence of function calls, reasoning over their outputs to make decisions or answer complex queries. This would allow us to build more sophisticated AI systems capable of accomplishing intricate tasks.
2. **Facilitating Domain-Specific Languages (DSLs)**: With a standard for function calling, LLMs could better support DSLs. If a DSL is based on function calling, a properly trained LLM could generate a program aligned with that DSL, a capability that would bring us closer to the holy grail of AI agents.
3. **Enhancing AI Plugin Systems**: A standard for function calling could also serve as the foundation for standardizing AI plugin systems. This would allow for more reliable, versatile interactions between AI systems and external tools or APIs, broadening the range of tasks AI can assist with.
4. **Accelerating AI Innovation**: By establishing a common language for AI interactions, we could accelerate the pace of AI innovation. Developers and researchers would be able to focus more on pushing the boundaries of what AI can do, instead of wrestling with disparate function calling systems.

These possibilities are just the tip of the iceberg. A standardized function calling system for LLMs could unlock an exciting new chapter in our journey towards making AI an even more integral part of our digital lives.


### Conclusion: A Call to Standardize

In the face of rapidly advancing AI technology and the proliferation of large language models, the need for standardization is becoming increasingly apparent. This proposal presents a compelling case for the establishment of standard practices around function calling in LLMs, a critical capability that enables them to interact with the external world.

Standardization, guided by a standard training dataset for fine-tuning, promises to open up new possibilities for the application and interaction of LLMs. It allows for greater compatibility across different models and systems, fosters competition and innovation, and enables the creation of more complex systems, such as agents and domain-specific languages.

While discussing this topic with my colleague [Leo Balter](https://twitter.com/leobalter), we believe that an organization like [ECMA International](http://www.ecma-international.org), with its history, is ideally positioned to lead this effort. Such an initiative would involve the collaboration of various stakeholders in the AI community, from researchers and developers to businesses and users.

Through this collective endeavor, we can ensure that as LLMs evolve, they do so in a way that maximizes their potential, promotes interoperability, and benefits the broader AI community. It is not just a call to standardize, but a call to unlock the full potential of large language models for the future.
