---
title: Structured DNS errors in Chromium
summary: Help a browser distinguish a blocked domain from a broken connection.
year: 2025
order: 1
field: Open-source contribution
cover: chromium-flow
coverAlt: Conceptual flow of DNS error metadata through Chromium's protocol parser
gallery: [gsoc/certificate.png]
highlights:
  - Structured error metadata in the DNS parser
  - Resolver details expanded into usable URLs
  - Validation and feature-flagged tests
tools: [C++, Chromium, DNS, GSoC]
contributions: https://chromium-review.googlesource.com/q/owner:diaochenhao@gmail.com
code: https://chromium-review.googlesource.com/c/chromium/src/+/6707102
article: /gsoc/
shortTitle: "Chromium DNS"
context: "Google Summer of Code 2025"
badge: "Google Summer of Code"
system:
  nodes:
    - { kind: "Resolver", title: "Public DNS resolver", detail: "Blocks a domain and attaches an Extended DNS Error" }
    - { kind: "Parser", title: "EdeOpt parser", detail: "Reads the JSON in EXTRA-TEXT with strict UTF-8 checks", mine: true }
    - { kind: "Data", title: "FilteringDetails", detail: "ro: resolver operator, inc: incident ID", mine: true }
    - { kind: "Utility", title: "URL generator", detail: "Maps ro to a URI template and expands {inc}", mine: true }
  links: ["EDE option", "parsed", "lookup"]
  note: "Everything runs behind the kDnsFilteringDetails feature flag, off by default."
specs:
  - { parameter: "Change lists", condition: "2 main + 1 follow-up, in Chromium’s Gerrit", value: "3" }
  - { parameter: "Parsed fields", condition: "draft-nottingham-public-resolver-errors-01", value: "ro, inc" }
  - { parameter: "Feature flag", condition: "kDnsFilteringDetails", value: "Off by default" }
  - { parameter: "Test suite", condition: "Positive, negative and flag-off cases", value: "net_unittests" }
---

When a public DNS resolver blocks a domain, a browser may only see a failed lookup. During Google Summer of Code 2025, I extended Chromium's DNS parser to read the resolver operator and incident from an Extended DNS Error, and built a URL generator that expands them into a details link.

Tests cover valid messages, missing fields, unexpected types, Unicode edge cases and the disabled flag. The work sits behind a feature flag that is off by default: it is a foundation, not a shipped error screen.
