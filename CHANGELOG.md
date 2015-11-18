# Unreleased

##### Changed

- assert now uses a custom AssertionError and function instead of V8's assert.

##### TODO

- better change size on browser resize
- Do something better about the overlapping nodes, to distinguish them better

# 0.0.1 2015-11-17

##### Added

 - Webpack, gulp, and other dependencies
 - Added d3, drawing ring
 - Functions to draw nodes on their correct position
 - api to update nodes drawn
 - handle assertion errors -> show alert
 - Added filtering function

##### Bugs
- Assert does not work on non-V8 browsers. Won't use it again. But for now, app
will not throw proper assertion errors on Firefox.



---------------------------------- Tags used ---------------

Added
Changed
Fixed
Bugs
Deprecated
Removed
