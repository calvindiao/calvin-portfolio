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
badge: { label: "Google Summer of Code", icon: "code" }
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

When a public DNS resolver blocks a domain, a browser may only see a failed lookup. During Google Summer of Code 2025, I worked on the foundation for carrying a more useful explanation into Chromium's DNS stack.

The contribution adds support for Public Resolver Errors: structured metadata carried in an Extended DNS Error response. I extended the protocol parser to read the resolver operator and filtering incident, and built a separate URL generator that expands those details using URI templates.

I added tests for valid messages, missing fields, unexpected types, Unicode edge cases, and disabled-feature behavior. The parsing work is guarded by a feature flag, disabled by default in the documented implementation. It establishes a foundation for future browser experiences; it does not claim that a new user-facing error screen has shipped.

Working in Chromium also meant learning a large codebase's review practices: Gerrit change lists, dependency hygiene, unit tests, and precise separation of responsibilities. Reviewer feedback helped shape where validation belongs and how resolver lookup data should be represented. The links below lead to the actual code reviews and contribution history.
