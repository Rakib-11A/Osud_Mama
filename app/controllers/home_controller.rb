class HomeController < ApplicationController
  def index
    # @categories = Category.featured.limit(6)
    # @featured_products = Product.featured.includes(:reviews).limit(8)
    # @best_sellers = Product.best_selling.limit(10)
  end
end
