# bike-web-b2b

Front-end in vanilla.js for [bike-service-hub]("https://github.com/stonarini/bike-service-hub"). Using new concepts, such as classes, web-components, generators... and the flux pattern.

# Flux Pattern
The flux pattern has been implemented using the following rules:
- The ```dispatcher``` is the object managing the *actions* (also called events).
- The ```stores``` manage the state of the information, and register listeners of
the *actions*. An action **may** or **may not** cause a store state to change.
- The ```components``` listen to one or different stores for changes; When a change
occurs, the *render* method of the component is called.

# Bike Card State
The bike-card component state is managed by a generator. Every click on the
component toggles the next state, and the final click resets the states and
toggles an *action* through the dispatcher.

