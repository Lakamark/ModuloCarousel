/**
 * Supported environments where a plugin can be registered.
 */
export type CarouselPluginKind = 'production' | 'development' | 'testing';

/**
 * Optional metadata describing a plugin.
 *
 * This metadata is primarily used by the {@link CarouselPluginRegistry}
 * to determine whether a plugin should be registered based on the
 * current execution environment.
 */
export interface CarouselPluginMeta {
    /**
     * Target environments where the plugin is allowed to run.
     *
     * Example:
     * - ['production'] → production only
     * - ['development'] → dev tools only
     * - ['production', 'development'] → both
     *
     * If omitted, the plugin is treated as a production plugin.
     */
    readonly kinds?: readonly CarouselPluginKind[];
}