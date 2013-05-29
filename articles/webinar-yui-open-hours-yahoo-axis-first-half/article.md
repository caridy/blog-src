<p>Yesterday <a href="http://twitter.com/ekashida">@ekashida</a> and I did a quick walkthrough on the technical part of Yahoo! Axis, specifically the front end and the web components. Here is the recorded session:</p>
<p><iframe width="608" height="456" src="http://www.youtube.com/embed/vIvFbJo1Fj8" frameborder="0" allowfullscreen=""></iframe><br>

 * http://www.youtube.com/watch?v=vIvFbJo1Fj8&amp;hd=1

<p>These are some of the bullets we covered during this first half:</p>
<h3>Yahoo! axis architecture</h3>
<ul>
<li>(caridy) why native (performance, stability, etc)</li>
<li>(caridy) why web (reusable pieces, transparent updates, fine grained layouts using css, buckets, experimentation, etc)</li>
<li>(caridy) why hybrid (why BM is native, why SL is web, why Omni bar is native)</li>
<li>(keugene) why hybrid (how we mimic some of the native pieces for web)</li>
<li>(keugene) creating/destroying apps as needed to avoid memory leak issues altogether</li>
<li>(caridy / keugene) why independent apps and how it works</li>
</ul>
<h3>YUI Components used and extended in Yahoo! Axis</h3>
<ul>
<li>(keugene) [yui core infrastructure] extensions vs plugins (registration, race conditions, configs, etc)</li>
<li>(keugene) communication layer Y.CL overview (we show both perf analysis, and the post for postmessage vs Y.CL)</li>
<li>(caridy) smart localstorage (cache-offline-smart) and how we extend yui cache-offline for better performance and manageability</li>
<li>(keugene) [scrollview-hack] hooking into scrollview-paginator to implement our own anchoring process to avoid cutting cards</li>
<li>(keugene) [scrollview-hack] optimization</li>
<li>(caridy) [scrollview-hack] defining points of interest as new events (pulling)</li>
</ul>
<p>Next week we plan to talk about “Mojito” in the context of Yahoo! Axis.</p>