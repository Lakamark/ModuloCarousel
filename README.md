# ModuloCarousel

A modular and lightweight carousel library with a plugin system.

---

## Features

- Lightweight and framework-agnostic
- Plugin-based architecture
- Clean and predictable API
- Fully testable (TDD-friendly)
- Optional DOM extensions via plugins

---

## Installation

```bash
npm install modulo-carousel
```

## Quick Start
```javascript
import { ModuloCarousel } from 'modulo-carousel';

const element = document.querySelector('[data-carousel]');

const carousel = new ModuloCarousel(element);

carousel.init();
```
## Plugin System

ModuloCarousel is built around a plugin architecture.

You can extend the carousel with features like:

* controls
* pagination
* autoplay
* debug tools

### Basic example Plugin 
```javascript
const controlsPlugin = {
    name: 'controls',
    version: '1.0.0',

    setup(api) {
        console.log('Controls ready');
    },

    destroy() {
        console.log('Controls destroyed');
    }
};
```
### Register Plugin

```javascript
import { CarouselPluginRegistry } from 'modulo-carousel';

const registry = new CarouselPluginRegistry(
    [controlsPlugin],
    'production'
);
```

### Environments
Plugins can define where they should be available:
```javascript
meta: {
    kinds: ['development']
}
```

#### Supported environments:
`production`
`development`
`testing`

### Behavior
| Plugin config                  | Production | Development |
|--------------------------------|------------|-------------|
| no meta                        | ✅          | ❌           |
| `['production']`               | ✅          | ❌           |
| `['development']`              | ❌          | ✅           |
| `['production','development']` | ✅          | ✅           |

## Plugin Lifecycle
Each plugin follows a simple lifecycle:

```javascript
setup(api)   // called on boot
destroy()    // called on destroy
```

## Plugin API
```javascript
setup(api)   // called on boot
destroy()    // called on destroy
```

```ts
interface CarouselPlugin {
    name: string;
    version: string;

    meta?: {
        kinds?: ('production' | 'development' | 'testing')[];
    };

    setup(api: CarouselPluginApi): void;
    destroy(): void;
}
```

## Architecture Overview
```
Carousel
↓
PluginRegistry
↓
Plugins
↓
Renderer / DOM
```
## Testing

The library is built with testability in mind.

deterministic behavior
clear lifecycle
no hidden side effects

## Contributing

Contributions are welcome.

Fork the repo
Create a branch
Write tests first (TDD)
Submit a PR