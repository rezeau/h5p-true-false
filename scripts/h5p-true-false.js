H5P.TrueFalse = (function ($, Question) {

  /**
   * Initialize module.
   *
   * @class H5P.TrueFalse
   * @extends H5P.Question
   * @param {Object} options
   * @param {number} id Content identification
   * @param {Object} contentData Task specific content data
   */
  function TrueFalse(options, id, contentData) {
    var self = this;

    // Inheritance
    Question.call(self, 'true-false');

    var params = $.extend(true, {
    }, options);

    // Counter used to create unique id for this question
    TrueFalse.counter = (TrueFalse.counter === undefined ? 0 : TrueFalse.counter + 1);

    // A unique ID is needed for aria label
    var domId = 'h5p-tfq' + H5P.TrueFalse.counter;

    // saves the content id
    this.contentId = id;
    this.contentData = contentData;

    
    /**
     * Register buttons
     *
     * @method registerButtons
     * @private
     */
    var registerButtons = function () {
      var $content = $('[data-content-id="' + self.contentId + '"].h5p-content');
      var $containerParents = $content.parents('.h5p-container');

      // select find container to attach dialogs to
      var $container;
      if($containerParents.length !== 0) {
        // use parent highest up if any
        $container = $containerParents.last();
      }
      else if($content.length !== 0){
        $container = $content;
      }
      else  {
        $container = $(document.body);
      }

    };

    
    /**
     * Registers this question type's DOM elements before they are attached.
     * Called from H5P.Question.
     *
     * @method registerDomElements
     * @private
     */
    self.registerDomElements = function () {
      var self = this;

      // Check for task media
      var media = params.media;
      if (media && media.type && media.type.library) {
        media = media.type;
        var type = media.library.split(' ')[0];
        if (type === 'H5P.Image') {
          if (media.params.file) {
            // Register task image
            self.setImage(media.params.file.path, {
              disableImageZooming: params.media.disableImageZooming || false,
              alt: media.params.alt,
              title: media.params.title //If Hover text provided.
            });
          }
        }
        else if (type === 'H5P.Video') {
          if (media.params.sources) {
            // Register task video
            self.setVideo(media);
          }
        }
        else if (type === 'H5P.Audio') {
          if (media.params.files) {
            // Register task audio
            self.setAudio(media);
          }
        }
      }

    };

   }

  // Inheritance
  TrueFalse.prototype = Object.create(Question.prototype);
  TrueFalse.prototype.constructor = TrueFalse;

  return TrueFalse;
})(H5P.jQuery, H5P.Question);
