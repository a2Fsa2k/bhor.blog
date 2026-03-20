---
title: The 11 Lines of Code That Almost Broke the Internet
banner: 
---

# The 11 Lines of Code That Almost Broke the Internet

## Introduction

On March 22, 2016, a small but unusual disruption began spreading through the JavaScript ecosystem. Developers across different companies and open-source projects started reporting that their builds were failing. Commands that had worked reliably the previous day were now returning errors.

Within hours, the impact became visible across the ecosystem:

* `npm install` began failing for thousands of projects.
* Continuous integration pipelines turned red.
* Popular toolchains built on Node.js stopped compiling.
* Deployment workflows were paused because dependencies could not be resolved.
* Packages deep inside dependency trees suddenly became unreachable.

Nothing had been hacked. No servers were down. No data centers were offline.

It was not:

* A security vulnerability.
* A distributed denial-of-service attack.
* A breaking change in a major framework.
* A flaw in the JavaScript language itself.

What had changed was simpler than any of those explanations.

A single package had been unpublished from the npm registry.

That package contained eleven lines of JavaScript.

Not eleven thousand. Not even one hundred. Eleven.

Those eleven lines implemented a function whose only responsibility was to pad a string with characters on its left. It was the kind of utility any developer could write in minutes. And yet, its removal was enough to halt builds across a large portion of the ecosystem.

How does a function that trivial become structurally indispensable? How does something so small accumulate enough dependency weight that its absence is immediately disruptive?

To answer that, we have to begin by looking directly at the code.

---

## Part II — The Code

Before talking about ecosystems, governance, or infrastructure, here is the function itself. No commentary. No framing. Just the code as it was published.

```js
module.exports = leftpad;

function leftpad (str, len, ch) {
  str = String(str);

  var i = -1;

  ch || (ch = ' ');
  len = len - str.length;

  while (++i < len) {
    str = ch + str;
  }

  return str;
}
```

That is what disrupted thousands of builds.

Now let’s go through it line by line.

### Line 1

```js
module.exports = leftpad;
```

This is Node.js module syntax. It exports the function so other files can require it. Without this line, the function exists but cannot be imported as a package.

### Line 2

```js
function leftpad (str, len, ch) {
```

Three parameters: the input value, the desired length, and the padding character.

### Line 3

```js
str = String(str);
```

JavaScript is loosely typed. This forces conversion into a string so concatenation behaves predictably.

### Line 4

```js
var i = -1;
```

The loop counter starts at -1 because the loop uses pre-increment. It is a compact pattern.

### Line 5

```js
ch || (ch = ' ');
```

If no padding character is provided, it defaults to a space.

### Line 6

```js
len = len - str.length;
```

This computes how many characters need to be added.

### Line 7–9

```js
while (++i < len) {
  str = ch + str;
}
```

Each iteration prepends one character. Because strings are immutable, each step creates a new string. This is inefficient in theory but negligible in practice due to small input sizes.

### Final Line

```js
return str;
```

The function returns the padded string.

There is no hidden complexity here. It is a small, easily reproducible utility.

Now here is the same idea implemented in Rust.

---

## A Rust Version

```rust
fn leftpad(input: &str, total_len: usize, pad_char: char) -> String {
    let current_len = input.chars().count();

    if current_len >= total_len {
        return input.to_string();
    }

    let pad_len = total_len - current_len;

    let padding: String = std::iter::repeat(pad_char)
        .take(pad_len)
        .collect();

    format!("{}{}", padding, input)
}
```

This version builds the padding once and concatenates once. It runs in linear time.

Modern JavaScript now provides a native equivalent:

```js
str.padStart(total_len, ch)
```

But performance was never the issue.

The problem was not how the function worked.

It was how it was depended upon.

That is where the story turns.

---

## Part III — The Dependency Web

The function itself is unremarkable. You could write it in minutes. What matters is not the code, but where the code lived.

The package was published on npm. It was not copied into each project. It was installed as a dependency, often indirectly.

A typical chain looked like this:

```
Your Application
  └── Framework A
        └── Library B
              └── Utility C
                    └── left-pad
```

Most developers did not know they depended on left-pad. It appeared deep inside dependency graphs. It was inherited, not chosen.

When you run `npm install`, npm resolves dependencies recursively and fetches each package from its registry. If any required package is missing, the process fails.

When left-pad was unpublished, npm could no longer retrieve it. The dependency graph had a gap. Installation failed.

The system did not fail because of logic. It failed because of absence.

This distinction matters.

Open source code is distributed. Anyone can copy it. But npm’s registry is centralized. It is the source of truth for versioned packages. If a version disappears, systems depending on it have no fallback.

The ecosystem optimized for reuse and speed. It did not optimize for disappearance.

At this point, the problem is no longer about code. It is about structure.

---

## Part IV — The Deletion

Left-pad was removed deliberately.

Its author, Azer Koçulu, was involved in a naming dispute over another package. npm reassigned that package name to a company. In response, he unpublished his packages, including left-pad.

At the time, npm allowed this. Authors controlled their packages.

The consequences had not been fully understood.

When left-pad disappeared, builds failed across the ecosystem. Not because the function was complex, but because it was unavailable.

This exposed a tension.

On one side was author control. Open source code is owned by its creator. On the other side was ecosystem dependence. Thousands of systems relied on the assumption that packages would remain available.

npm responded by restoring the package and restricting unpublishing. The system shifted from author-centric to stability-centric.

A registry that overrides authors is no longer just a host. It is infrastructure.

---

## Part V — What This Incident Revealed

The incident was resolved quickly. Builds resumed. Policies changed.

But the deeper lesson remained.

Modern software is built through composition. Applications depend on frameworks, frameworks depend on libraries, and libraries depend on small utilities. This creates dense dependency networks where simple components become structurally important.

Left-pad was not important because of its logic. It was important because of its position.

The npm registry amplified this. Code was decentralized, but distribution was centralized.

The ecosystem assumed stability, availability, and continuity. Those assumptions held until they didn’t.

The system adapted. It became more robust.

But the underlying pattern remains.

We build systems that are powerful because they are interconnected. And that same interconnection introduces hidden points of failure.

---

## Conclusion — The Smallest Assumption

The left-pad incident is often remembered as a moment of absurdity. Eleven lines of code. A missing package. A brief panic.

But the real disturbance was quieter.

The code was trivial. Anyone could rewrite it.

And yet, no one had.

Not because they could not.
But because they assumed they would never need to.

That assumption is the foundation of modern software. We assume dependencies remain available. We assume systems resolve correctly. We assume small things remain small in consequence.

Left-pad did not almost break the internet. It revealed how much of it runs on unexamined assumptions.

We build faster than we audit.
We compose more than we understand.
We depend more than we notice.

And sometimes, something insignificant disappears, and the structure briefly reveals itself.

---
